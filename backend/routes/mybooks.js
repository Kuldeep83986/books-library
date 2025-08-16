const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Book = require('../models/Book');

// GET /api/mybooks - get user's myBooks (protected)
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('myBooks.book').lean();
    res.json({ myBooks: user.myBooks || [] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/mybooks/:bookId - add book to user list
router.post('/:bookId', auth, async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const user = await User.findById(req.user._id);
    const exist = user.myBooks.some(mb => String(mb.book) === String(bookId));
    if (exist) return res.status(400).json({ message: 'Already added' });

    user.myBooks.push({ book: book._id, status: 'Want to Read', rating: 0 });
    await user.save();
    await user.populate('myBooks.book'); // fresh populate
    res.json({ myBooks: user.myBooks });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH status
router.patch('/:bookId/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['Want to Read', 'Currently Reading', 'Read'];
    if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });

    const user = await User.findById(req.user._id);
    const item = user.myBooks.find(mb => String(mb.book) === req.params.bookId);
    if (!item) return res.status(404).json({ message: 'Not in your list' });

    item.status = status;
    await user.save();
    await user.populate('myBooks.book');
    res.json({ myBooks: user.myBooks });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH rating
router.patch('/:bookId/rating', auth, async (req, res) => {
  try {
    const rating = Number(req.body.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return res.status(400).json({ message: 'Rating 1-5 required' });

    const user = await User.findById(req.user._id);
    const item = user.myBooks.find(mb => String(mb.book) === req.params.bookId);
    if (!item) return res.status(404).json({ message: 'Not in your list' });

    item.rating = rating;
    await user.save();
    await user.populate('myBooks.book');
    res.json({ myBooks: user.myBooks });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
