require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbconnect = require('./db/db');
const route = require('./routes');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // Vite dev server
    credentials: true, // allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(route);

app.listen(PORT, () => {
  dbconnect();
  console.log(`http://localhost:${PORT}`);
});
