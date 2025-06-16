import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    movieId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    review : {
        type: String,
        required: true
    }
}
)
const Review = mongoose.model('Review', reviewSchema)

export default Review;