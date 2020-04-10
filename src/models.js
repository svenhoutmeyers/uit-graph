
// check if we didn't have to use apollo-datasource-mongodb
const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  title: String,
  average_rating: Number,
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = {
  Review
};