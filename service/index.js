const Product = require('../model/product.model');

module.exports.addProduct = async product => {
  if (!product.name)
    throw new Error("Validation Error");

  if (!product.category)
    throw new Error("Validation Error");

  if (!product.image)
    throw new Error("Validation Error");

  if (!product.description)
    throw new Error("Validation Error");

  if (!product.popularity)
    throw new Error("Validation Error");

  const productModel = new Product(product);
  return await productModel.save();
}

module.exports.getProducts = async (
  page = 1,
  record = 10,
  category,
  search,
  sortDirection
) => {
  if (category && typeof category !== 'string')
    throw new Error("Validation Error");

  if (search && typeof search !== 'string')
    throw new Error("Validation Error");

  if (sortDirection) {
    sortDirection = Number(sortDirection);
    console.log(sortDirection);
    if (!(sortDirection === -1 || sortDirection === 1))
      throw new Error("Validation Error");
  }

  if (typeof page !== "number")
    page = Number(page)

  if (typeof record !== "number")
    record = Number(record)

  const pipeline = [];

  if (category) {
    pipeline.push({
      $match: { category }
    });
  }

  if (search) {
    pipeline.push({
      $match: { 
        $or: [
          {
            name: { $regex: new RegExp(search), $options: 'i' }
          },
          {
            description: { $regex: new RegExp(search), $options: 'i' }
          },
        ]
      }
    });
  }

  if (sortDirection) {
    pipeline.push({
      $sort: { popularity: sortDirection }
    });
  }

  pipeline.push({
    $skip: (page - 1) * record,
  });

  pipeline.push({
    $limit: record,
  });

  return await Product.aggregate(pipeline);
}
