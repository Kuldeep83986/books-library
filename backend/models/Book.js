const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  description: String,
  cover: String, // Cloudinary URL
  pdf: String 
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
