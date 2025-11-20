const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  price: {
    type: Number,
    min: 0.01
  },
  categories: {
    type: [String],
    default: []
  },
  inStock: {
    type: Boolean,
    default: false
  },
  addedBy: {
    type: String,
    required: [true, "email is required"],
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'invalid email']
  }
})

const ProductModel = mongoose.model('Product', ProductSchema, 'products')

module.exports = {
  ProductModel
}