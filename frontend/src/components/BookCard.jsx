import React from 'react';
import { useApp } from '../context/AppContext';

export default function BookCard({ book }) {
  const { user, addToMyBooks } = useApp();

  const handleAdd = async () => {
    if (!user) {
      alert('Please login to add books.');
      return;
    }
    try {
      await addToMyBooks(book._id);
      alert('Added to My Books');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="border rounded p-4 bg-white">
      {book.cover && <img src={book.cover} alt={book.title} className="h-48 w-full object-cover mb-3 rounded" />}
      <h3 className="font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-600">{book.author}</p>
      <p className="text-sm mt-2">{book.description}</p>
      <div className="mt-3">
        <button onClick={handleAdd} className="px-3 py-1 border rounded cursor-pointer">Want to Read</button>
      </div>
    </div>
  );
}
