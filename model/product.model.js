const { Schema, model } = require("mongoose");

const productModel = model('products', new Schema({
  name: String,
  category: String,
  image: String,
  description: String,
  popularity: Number
}, { timestamps: true }));

module.exports = productModel;

