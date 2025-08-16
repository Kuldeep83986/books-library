const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Use multer-storage-cloudinary so files go directly to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'my_library/book_covers',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
  }
});
const parser = multer({ storage });

// GET /api/books - public list
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).lean();
    res.json({ books });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/books - add book with cover upload (multipart/form-data)
// We will allow unauthenticated adding in this basic version, but you can add auth check.
router.post('/', parser.single('cover'), async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const cover = req.file ? req.file.path : ''; // Cloudinary URL

    const book = new Book({ title, author, description, cover });
    const saved = await book.save();

    // Emit real-time event to connected clients
    const io = req.app.get('io');
    if (io) io.emit('newBook', saved);

    res.status(201).json({ book: saved });
  } catch (err) {
    console.error('book create error', err);
    res.status(500).json({ message: 'Failed to create book' });
  }
});

module.exports = router;
