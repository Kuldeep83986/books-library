import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div>
          <Link to="/" className="text-xl font-semibold">Books Library</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          {user && <Link to="/mybooks" className="hover:underline">My Books</Link>}
          {user && <Link to="/add-book" className="hover:underline">Add Book</Link>}
          {!user && <Link to="/auth" className="hover:underline">Login / Register</Link>}
          {user && (
            <>
              <span className="text-sm text-gray-600">{user.email}</span>
              <button onClick={onLogout} className="px-3 py-1 border rounded text-sm cursor-pointer ">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
