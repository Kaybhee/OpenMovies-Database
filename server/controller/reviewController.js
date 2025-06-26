import Review from '../../model/review.js'
import errHandling from '../../middlewares/error/errHandling.js'

export const getMovieReviews = async(req, res, next) => {
    try {
        const reviews = await Review.find();
        if (!reviews) {
            return next(errHandling(404, "No reviews found for this movie"))
        }
        res.status(200).json(reviews)
    } catch (err) {
        next(err)
    }
}
    

export const getReviews = async (req, res, next) => {
    try {
        const {movieId}  = req.params;
        // console.log(movieId)
        const rev = await Review.find({movieId: parseInt(movieId)});
        // console.log(rev)
            if (!rev) {
                return next(errHandling(404, "Review not found"))
            }
            return res.status(200).json({message: "Reviews fetched successfully", rev})
    } catch (err) {
        next(err)
    }
}

export const createReview = async (req, res, next) => {

    try {
        // const mov = new Review(req.body)
        let {movieId, user, review} = req.body;
        movieId =parseInt(movieId);
        if (!movieId || !user || !review) {
            return next(errHandling(400, "Please provide all fields"))
        }
        const savedReview = await Review.create({
            movieId: movieId,
            user: user,
            review: review
        })
        res.status(201).json({message: "Review created successfully", savedReview})

    } catch(error) {
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
        return res.status(200).json({message: "Review Updated successfully", updateReview})
    } catch (err) {
        next(err)
    }
}


export const deleteReview = async (req, res, next) => {
    const { movieId } = req.params;
    try {
        const review = await Review.findByIdAndDelete(movieId);
        if (!review) {
            console.error("Not found");
            return next(errHandling(404, "Review not found"))
        }
        return res.status(200).json({messag: "Review deleted successfully", review})
    }catch (err) {
        next(err)
    }
} 