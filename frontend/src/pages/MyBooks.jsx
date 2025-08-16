import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import MyBookCard from '../components/MyBookCard';

export default function MyBooks() {
  const { user, myBooks, fetchMyBooks } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchMyBooks();
    // eslint-disable-next-line
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Books</h1>
      {myBooks.length === 0 ? (
        <div>You have no books yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myBooks.map(item => <MyBookCard key={item._id || item.book._id} item={item} />)}
        </div>
      )}
    </div>
  );
}
