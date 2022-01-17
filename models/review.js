const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Product rating must be greater or equal than 0'],
      max: [5, 'Product rating can not be greater than 5'],
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      minlength: [10, 'Review comment must be at least 10 characters long'],
      maxlength: [500, 'Review comment can not be longer than 500 characters'],
    },
    author: {
      type: String,
      required: [true, 'Review name is required'],
      minlength: [2, 'Review name must be at least 2 characters long'],
      maxlength: [50, 'Review name can not be longer than 50 characters'],
    },
    //   author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //   },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
