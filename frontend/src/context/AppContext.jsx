import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const API = "https://books-library-vb42.onrender.com" || 'http://localhost:8080';
axios.defaults.baseURL = API;
axios.defaults.withCredentials = true;

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { email, id }
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);

  // Socket.IO setup for real-time updates
  useEffect(() => {
    const socket = io(API, { withCredentials: true });
    socket.on('connect', () => console.log('Connected socket', socket.id));
    socket.on('newBook', (newBook) => {
      // prepend new book for freshness
      setBooks(prev => [newBook, ...prev]);
    });
    return () => socket.disconnect();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      await fetchMe();
      await fetchBooks();
    })();
    // eslint-disable-next-line
  }, []);

  const fetchMe = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      setUser(res.data.user);
      if (res.data.user) fetchMyBooks();
    } catch (err) {
      console.error('fetchMe', err);
    }
  };

  const fetchBooks = async () => {
    setLoadingBooks(true);
    try {
      const res = await axios.get('/api/books');
      setBooks(res.data.books || []);
    } catch (err) {
      console.error('fetchBooks', err);
    } finally {
      setLoadingBooks(false);
    }
  };

  const fetchMyBooks = async () => {
    try {
      const res = await axios.get('/api/mybooks');
      setMyBooks(res.data.myBooks || []);
    } catch (err) {
      console.error('fetchMyBooks', err);
    }
  };

  const register = async (email, password) => {
    const res = await axios.post('/api/auth/register', { email, password });
    setUser(res.data.user || { email });
    await fetchMyBooks();
  };

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    setUser(res.data.user || { email });
    await fetchMyBooks();
  };

  const logout = async () => {
    await axios.get('/api/auth/logout');
    setUser(null);
    setMyBooks([]);
  };

  const addToMyBooks = async (bookId) => {
    if (!user) throw new Error('Not logged in');
    const res = await axios.post(`/api/mybooks/${bookId}`);
    setMyBooks(res.data.myBooks);
  };

  const updateStatus = async (bookId, status) => {
    const res = await axios.patch(`/api/mybooks/${bookId}/status`, { status });
    setMyBooks(res.data.myBooks);
  };

  const updateRating = async (bookId, rating) => {
    const res = await axios.patch(`/api/mybooks/${bookId}/rating`, { rating });
    setMyBooks(res.data.myBooks);
  };

  const addBook = async (formData) => {
    // formData is FormData with cover file (multipart/form-data)
    const res = await axios.post('/api/books', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    // server emits newBook to sockets — but also return the created book so caller can handle immediately
    return res.data.book;
  };

  return (
    <AppContext.Provider value={{
      user, books, myBooks, loadingBooks,
      register, login, logout,
      fetchBooks, fetchMyBooks,
      addToMyBooks, updateStatus, updateRating,
      addBook
    }}>
      {children}
    </AppContext.Provider>
  );
};
