class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  search() {
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
}

module.exports = ApiFeatures;
