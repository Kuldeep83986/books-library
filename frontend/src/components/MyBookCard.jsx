import React from 'react';
import { useApp } from '../context/AppContext';

export default function MyBookCard({ item }) {
  const { updateStatus, updateRating } = useApp();
  const b = item?.book; // safe access

  if (!b) {
    return (
      <div className="border rounded p-4 bg-red-50 text-red-600 text-sm">
        ⚠️ Book data not available
      </div>
    );
  }

  const onStatus = async (e) => {
    await updateStatus(b._id, e.target.value);
  };

  const onRating = async (e) => {
    const val = Number(e.target.value);
    if (val >= 1 && val <= 5) await updateRating(b._id, val);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      {b.cover && (
        <img
          src={b.cover}
          alt={b.title}
          className="h-48 w-full object-cover mb-3 rounded-md"
        />
      )}
      <h3 className="font-semibold text-lg truncate">{b.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{b.author}</p>

      <div className="mt-3 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Status:</label>
          <select
            value={item.status}
            onChange={onStatus}
            className="border p-1 rounded text-sm cursor-pointer"
          >
            <option>Want to Read</option>
            <option>Currently Reading</option>
            <option>Read</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Rating:</label>
          <select
            value={item.rating || 0}
            onChange={onRating}
            className="border p-1 rounded text-sm cursor-pointer"
          >
            <option value={0}>--</option>
            <option value={1}>1 ★</option>
            <option value={2}>2 ★★</option>
            <option value={3}>3 ★★★</option>
            <option value={4}>4 ★★★★</option>
            <option value={5}>5 ★★★★★</option>
          </select>
        </div>
      </div>
    </div>
  );
}
