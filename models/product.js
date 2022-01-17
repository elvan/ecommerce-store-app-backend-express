const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [5, 'Product name must be at least 5 characters long'],
      maxlength: [100, 'Product name can not be longer than 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      default: 0,
      min: [0, 'Product price must be greater or equal than 0'],
      max: [1000000000, 'Product price can not be greater than 1000000000'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Product brand is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: {
        values: [
          'Books',
          'Movies',
          'Music',
          'Games',
          'Electronics',
          'Computers',
          'Home',
          'Garden',
          'Tools',
          'Grocery',
          'Health',
          'Beauty',
          'Toys',
          'Kids',
          'Baby',
          'Clothing',
          'Shoes',
          'Jewelery',
          'Sports',
          'Outdoors',
          'Automotive',
          'Industrial',
        ],
        message:
          'Product category must be one of the following: ' +
          'Books, Movies, Music, Games, Electronics, Computers, Home, Garden, ' +
          'Tools, Grocery, Health, Beauty, Toys, Kids, Baby, Clothing, Shoes, ' +
          'Jewelery, Sports, Outdoors, Automotive, Industrial',
      },
    },
    quantityInStock: {
      type: Number,
      required: [true, 'Product quantity in stock is required'],
      default: 0,
      min: [0, 'Product quantity in stock must be greater or equal than 0'],
      max: [1000, 'Product quantity in stock can not be greater than 1000'],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    admin: {
      type: String,
      required: [true, 'Product admin is required'],
      trim: true,
      minlength: [2, 'Product admin must be at least 2 characters long'],
      maxlength: [50, 'Product admin can not be longer than 50 characters'],
    },
    // admin: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Product rating must be greater or equal than 0'],
      max: [5, 'Product rating can not be greater than 5'],
    },
    numberOfReviews: {
      type: Number,
      default: 0,
      min: [0, 'Product number of reviews must be greater or equal than 0'],
    },
    // reviews: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Review',
    //   },
    // ],
    reviews: [
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
          maxlength: [
            500,
            'Review comment can not be longer than 500 characters',
          ],
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
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
