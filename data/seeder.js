const faker = require('@faker-js/faker');
const dotenv = require('dotenv');

const connectToDatabase = require('../config/database');
const images = require('./images.js');
const Product = require('../models/product');

dotenv.config();

connectToDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    console.log('Products collection removed');

    const products = [];

    for (let i = 0; i < 20; i++) {
      products.push({
        name: faker.commerce.productName(),
        price: faker.commerce.price() * 1000,
        description: faker.lorem.paragraph(),
        brand: faker.company.companyName(),
        category: faker.commerce.department(),
        quantityInStock: faker.datatype.number({ min: 1, max: 100 }),
        images: [
          {
            public_id: '',
            url: images[faker.datatype.number({ min: 0, max: 19 })],
          },
          {
            public_id: '',
            url: images[faker.datatype.number({ min: 0, max: 19 })],
          },
          {
            public_id: '',
            url: images[faker.datatype.number({ min: 0, max: 19 })],
          },
        ],
        averageRatings: faker.datatype.number({
          min: 4,
          max: 5,
          precision: 0.01,
        }),
        numberOfReviews: faker.datatype.number({ min: 1, max: 100 }),
        reviews: [],
      });
    }

    await Product.insertMany(products);
    console.log('Products collection seeded');
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(1);
  }
};

seedProducts();
