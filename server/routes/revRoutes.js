import express from 'express';
import { getMovieReviews, getReviews, createReview, updateReview, deleteReview } from '../controller/controller.js';

const reviewRouter = express.Router();

reviewRouter.get('/movies', getMovieReviews);
reviewRouter.post('/new-review', createReview);
// review ID
reviewRouter.get('/:reviewId', getReviews);
reviewRouter.put('/:reviewId', updateReview);
reviewRouter.delete('/:id', deleteReview);

export default reviewRouter;

