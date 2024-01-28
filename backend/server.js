require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const notesRoutes = require('./routes/notes');
const userRoutes = require('./routes/user');

// express app
const app = express();

// middleware
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/notes', notesRoutes);
app.use('/api/user', userRoutes);

// Static file serving
app.use(express.static(path.join(__dirname, '/frontend2/build')));

// Serve React App
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend2', 'build', 'index.html'));
});

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('Listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });