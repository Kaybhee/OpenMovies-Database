import express from 'express';
import Review from '../../model/review.js'


export const getMovieReviews = async (req, res) => {
    const {movieId} = req.params;
    try {
        const reviews = await Review.findOne({movieId})
        if (!reviews) {
            return res.status(404).json({message: "No reviews found for this movie"});
        }
        res.status(200).json(reviews)
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Internal server error"})
    }
}

export const getReviews = async (req, res) => {
    try {
        const { reviewId } = req.params;
        if (reviewId) {
            const rev = await Review.findById(reviewId);
            if (!rev) {
                return res.status(404).json({message: "Review not found"})
            }
        } return res.status(200).json({message: "Reviews fetched successfully", rev})
    } catch (err) {
        return res.status(500).json({message: "Internal Server error", err})
    }
}

export const createReview = async (req, res) => {
    try {
        const  { movieId } = req.body.movieId;
        const { user } = req.body.user;
        const { review } = req.body.review;
        const newReview = await Review.create({
            movieId, 
            user,
            review
        })
        res.status(201).json({message: "Review created successfully", newReview})

    } catch(error) {
        res.status(500).json({message: "Internal Sevrver Error", error: error.message})
    }
}

export const updateReview = async (req, res) => {

}


export const deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    try {
        const review = await Review.findByIdAndDelete(reviewId);
        if (!review) {
            console.error("Not found");
            res.status(404).json({message: "Review not found"})
        }
        res.status(200).json({messag: "Review deleted successfully", review})
    }catch (error) {
    res.status(500).json({message: "Internal Server error"})
}
} 