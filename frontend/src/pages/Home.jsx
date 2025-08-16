import React, { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import BookCard from "../components/BookCard";

export default function Home() {
  const { books, loadingBooks, fetchBooks, user } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, []);

  // Calculate pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-4">
      {/* Hero / Welcome Section */}
      <div className="bg-blue-100 p-6 rounded-lg mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to Books Library</h1>
        <p className="text-gray-700 mb-4">
          Discover new books, track your reading, and rate your favorites.
        </p>
        {user ? (
          <p className="text-green-600 font-semibold">Hello, {user.email}!</p>
        ) : (
          <p className="text-gray-800">
            Please log in to add books to your library.
          </p>
        )}
      </div>

      {/* Books Section */}
      <h2 className="text-2xl font-bold mb-4">Books</h2>
      {loadingBooks ? (
        <div>Loading books...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentBooks.map((b) => (
              <BookCard key={b._id} book={b} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer "
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <div className="mt-12 bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Why Choose My Library?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Vast Collection</h3>
            <p className="text-gray-600">
              Explore a wide range of books across genres and authors.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Track Your Reading</h3>
            <p className="text-gray-600">
              Keep track of books you read, rate them, and see your progress.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Real-time Updates</h3>
            <p className="text-gray-600">
              New books added are instantly visible for all users in real-time.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto text-center">
          My Library is a community-driven platform designed for book lovers of
          all ages. We aim to provide easy access to a vast collection of books,
          allow users to track their reading, and stay updated with the latest
          additions in real-time. Our mission is to make reading enjoyable and
          accessible to everyone, whether you're a casual reader or an avid
          bookworm.
        </p>
      </div>
    </div>
  );
}
