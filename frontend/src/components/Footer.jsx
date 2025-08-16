// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Left section */}
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">Books Library</h2>
          <p className="text-gray-400">Explore and share your favorite books.</p>
          <p className="mt-2 text-gray-500 text-sm">© 2025 All Rights Reserved</p>
        </div>

        {/* Center section */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-indigo-400 transition-colors">Home</a></li>
            <li><a href="/books" className="hover:text-indigo-400 transition-colors">Books</a></li>
            <li><a href="/about" className="hover:text-indigo-400 transition-colors">About</a></li>
            <li><a href="/contact" className="hover:text-indigo-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Right section */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Follow Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">LinkedIn</a></li>
          </ul>
        </div>

      </div>
      <div className="mt-10 border-t border-gray-800 pt-4 text-center text-gray-500 text-sm">
        Designed with ❤️ by Kuldeep Kumar
      </div>
    </footer>
  );
}
