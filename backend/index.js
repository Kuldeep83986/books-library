require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const mybooksRoutes = require('./routes/mybooks');

const app = express();
const server = http.createServer(app);

// Socket.IO for real-time updates
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true
  }
});


// expose io via app locals so route handlers can emit events
app.set('io', io);

app.use(express.json());
app.use(cookieParser());

// CORS - allow credentials and the frontend origin
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

//test api first time
app.use("/test", (req,res)=>{
    res.send({ message :"This api is for testing..."});
})

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/mybooks', mybooksRoutes);

// Basic root
app.get('/', (req, res) => res.json({ ok: true }));

// DB + start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { })
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('DB connection error', err);
  });

// Socket connection logging 
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});
