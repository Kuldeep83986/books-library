const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MyBookSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  status: { type: String, enum: ['Want to Read', 'Currently Reading', 'Read'], default: 'Want to Read' },
  rating: { type: Number, min: 0, max: 5, default: 0 } // 0 = unrated
});

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  myBooks: [MyBookSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
