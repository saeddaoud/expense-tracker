// const express = require('express');
// const path = require('path');

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import transactionRoutes from './routes/transactionRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

// Connect to DB
connectDB();

// Mount routes
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/users', userRoutes);

// Read static file for deployment
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`.yellow.bold);
});
