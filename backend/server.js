const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected Buddy! ✅"))
    .catch(err => console.error("DB Connection Error: ", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));