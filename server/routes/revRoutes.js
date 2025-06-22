import express from 'express';
import { getReviews, createReview, updateReview, deleteReview } from '../controller/controller.js';

const reviewRouter = express.Router();

reviewRouter.get('/movie/:id', getReviews);
reviewRouter.post('/new-review', createReview);
// review ID
reviewRouter.get('/:id', getReviews);
reviewRouter.put('/:id', updateReview);
reviewRouter.delete('/:id', deleteReview);

export default reviewRouter;

