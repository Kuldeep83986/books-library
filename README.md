# Books Library App
A full-stack web application where users can discover books, add them to their personal library, and track their reading status and ratings.

## Features
- User registration and authentication
- Public users can view the list of available books
- Users can add new books with cover images (uploaded securely)
- Authenticated users can add books to their personal library
- Users can track reading status ("Want to Read", "Currently Reading", "Read") and rate books (1-5 stars)
- Real-time updates when a new book is added to the public list
- Responsive and modern UI

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, HTML
- **Backend**: Node.js, Express, Socket.IO, Multer, Cloudinary
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT-based (HttpOnly cookies)

## Deployed Link
[Live Demo](https://books-library-opal.vercel.app/)

## Setup Instructions
### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local instance or MongoDB Atlas)
- Cloudinary Account (for image uploads)

### 🔧 Backend Setup
Navigate to the backend directory:
```bash
cd backend
```
Install dependencies:
```bash
npm install
```
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/books-library
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
// Note: You may also need Cloudinary credentials in your .env or config
```
Start the backend server:
```bash
npm run dev
```

### 💻 Frontend Setup
Navigate to the frontend directory:
```bash
cd frontend
```
Install dependencies:
```bash
npm install
```
Start the frontend app:
```bash
npm run dev
```
Visit the app in your browser:  
`http://localhost:5173`

## API Endpoints

### ✅ Book Routes
- `GET /api/books` – Get all books (public)
- `POST /api/books` – Add a new book with cover image upload

### 👤 User Auth Routes
- `POST /api/auth/register` – Register user
- `POST /api/auth/login` – Login user
- `GET /api/auth/me` – Get current authenticated user
- `GET /api/auth/logout` – Logout user

### 📚 MyBooks Routes (Protected)
- `GET /api/mybooks` – Get current user's personal book list
- `POST /api/mybooks/:bookId` – Add a book to user's list
- `PATCH /api/mybooks/:bookId/status` – Update reading status
- `PATCH /api/mybooks/:bookId/rating` – Update book rating

## Notes
- Book covers are seamlessly uploaded and stored using Cloudinary.
- Real-time events are emitted via Socket.IO so connected clients see new books instantly.
- JWT is securely stored using HTTP-only cookies.
- Frontend uses Tailwind CSS for clean, modern styling.
