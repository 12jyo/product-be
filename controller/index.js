const service = require('../service');

module.exports.add = async (req, res) => {
  try {
    await service.addProduct(req.body);
    return res.json({
      status: true,
      message: "Product Added Successfully!"
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "server error"
    });
  }
}

module.exports.get = async (req, res) => {
  try {
    const result = await service.getProducts(
      req.query.page,
      req.query.record_limit,
      req.query.category,
      req.query.search,
      req.query.sort,
    );
    return res.json({
      status: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "server error"
    });
  }
}