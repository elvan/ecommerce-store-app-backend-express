class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  search() {
    // Example: /products?keyword=dessert
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: 'i',
          },
        }
      : {};

    this.mongooseQuery = this.mongooseQuery.find({ ...keyword });

    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };

    // Example: /products?category=Music
    const excludedFields = ['keyword', 'page', 'limit'];

    excludedFields.forEach((el) => delete queryObj[el]);

    // Example: /products?price[gte]=500000&price[lte]=800000
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

    return this;
  }

  pagination(pageSize) {
    // Example: /products?page=2&limit=12
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || pageSize;
    const skip = (page - 1) * limit;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;
