import express from 'express';
import { getMovieReviews, getReview, createReview, updateReview, deleteReview } from '../controller/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.get('/movies', getMovieReviews);
reviewRouter.post('/new-review', createReview);
// review ID
reviewRouter.get('/:movieId', getReview);
reviewRouter.put('/:movieId', updateReview);
reviewRouter.delete('/:movieId', deleteReview);

export default reviewRouter;

