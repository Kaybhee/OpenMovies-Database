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
    

export const getReviews = async (req, res) => {
    try {
        const { reviewId } = req.params;
        // console.log(reviewId)
        const rev = await Review.findById(reviewId);
        // console.log(rev)
            if (!rev) {
                return next(errHandling(404, "Review not found"))
            }
            return res.status(200).json({message: "Reviews fetched successfully", rev})
    } catch (err) {
        next(err)
    }
}

export const createReview = async (req, res) => {

    try {
        // const mov = new Review(req.body)
        const {movieId, user, review } = req.body;
        if (!movieId || !user || !review) {
            return next(errHandling(400, "Please provide all fields"))
        }
        const newReview = new Review({movieId, user, review})
        const savedReview = await newReview.save();

        res.status(201).json({message: "Review created successfully", savedReview})

    } catch(error) {
        next(err)
    }
}

export const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    try {
        const updateReview = await Review.updateOne({_id: ObjectId(reviewId)}, {$set: {user: req.body.user, review: req.body.review}})
        if(!updateReview) {
            return next(errHandling(404, "Review not found"))
        }
        return res.status(200).json({message: "Review Updated successfully", updateReview})
    } catch (err) {
        next(err)
    }
}


export const deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    try {
        const review = await Review.findByIdAndDelete(reviewId);
        if (!review) {
            console.error("Not found");
            return next(errHandling(404, "Review not found"))
        }
        return res.status(200).json({messag: "Review deleted successfully", review})
    }catch (err) {
        next(err)
    }
} 