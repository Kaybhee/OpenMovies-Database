import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    movieId : {
        type: String,
        required: true,
    },
    user : {
        type : String,
        required : true
    },
    review : {
        type: String,
        required: true
    }
}, {timestamps: true}
)
const Review = mongoose.model('Review', reviewSchema)

export default Review;