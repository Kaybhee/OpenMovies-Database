import Review from '../../model/review.js'
import errHandling from '../../middlewares/error/errHandling.js'
import { createClient } from 'redis';

const redisClient = createClient({url: process.env.REDIS_URL});
redisClient.connect()

export const getMovieReviews = async(req, res, next) => {
    try {
        const rev = await Review.find({isDelete: false});
        if (!rev) {
            return next(errHandling(404, "No reviews found for this movie"))
        }
        res.status(200).json({message: "Reviews fetched successfully", rev})
    } catch (err) {
        next(err)
    }
}
    

export const getReview = async (req, res, next) => {
    try {
        const {movieId}  = req.params;
        const cacheKey = `reviews:${movieId}`;
        let cachedRev = await redisClient.get(cacheKey);
        if (cachedRev) {
            return res.status(200).json({message: "Reviews fetched successfully", rev: JSON.parse(cachedRev)})
        }
        // console.log(movieId)
        const reviews = await Review.find({movieId: parseInt(movieId)});
        if (!reviews) {
                return next(errHandling(404, "Review not found"))
        }
        await redisClient.set(cacheKey, JSON.stringify(reviews), {EX: 600})
        // console.log(rev)
            
        // return res.status(200).json({message: "Reviews fetched successfully", rev: reviews})
                return res.status(200).json({message: "Reviews fetched successfully", rev: reviews})

    } catch (err) {
        next(err)
    }
}

export const createReview = async (req, res, next) => {

    try {
        // const mov = new Review(req.body)
        let {movieId, user, review} = req.body;
        movieId =parseInt(movieId);
        const existingUser = await Review.findOne({movieId, user})
        if (existingUser) {
            return next(errHandling(400, "User already Exists"))
        }
        if (!movieId || !user || !review) {
            return next(errHandling(400, "Please provide all fields"))
        }
        const rev = await Review.create({
            movieId: movieId,
            user: user,
            review: review
        })

        await redisClient.del(`reviews:${movieId}`)
        return res.status(201).json({message: "Review created successfully", rev})

    } 
    catch(err) {
        next(err)
    }
}

export const updateReview = async (req, res, next) => {
    const { movieId } = req.params;
    try {
        const updateReview = await Review.findById(movieId);
         if (!updateReview) {
            return next(errHandling(400, "Please provide a movieID"))
        }
        updateReview.movieId = req.body.movieId || updateReview.movieId;
        updateReview.user = req.body.user || updateReview.user;
        updateReview.review = req.body.review || updateReview.review;
        await updateReview.save();

        // updateOne({_id: ObjectId(movieId)}, {$set: {user: req.body.user, review: req.body.review}})
        await redisClient.del(`reviews: ${updateReview.movieId}`)
        return res.status(200).json({message: "Review Updated successfully", updateReview})
    } catch (err) {
        next(err)
    }
}


export const deleteReview = async (req, res, next) => {
    const { movieId } = req.params;
    try {
        const review = await Review.findById(movieId);
        if (!review) {
            console.error("Not found");
            return next(errHandling(404, "Review not found"))
        }
        await Review.updateOne({_id: movieId}, {$set: {isDelete: true}})
        await redisClient.del(`reviews:${review.movieId}`);
        return res.status(200).json({message: "Review deleted successfully", review})
    }catch (err) {
        next(err)
    }
} 