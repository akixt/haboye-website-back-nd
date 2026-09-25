require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');

const app = express();

app.use(express.json());
app.use(cookieParser());

// API routes first
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

// Static site (index.html, about.html, products.html, faq.html, /admin/*)
app.use(express.static(path.join(__dirname, 'public')));

// Unknown API paths -> 404 JSON
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Kaartaa hin argamne (Not found)' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Haboye website ${PORT} irratti deemaa jira (running on port ${PORT})`);
});
