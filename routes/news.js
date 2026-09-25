const express = require('express');

const router = express.Router();
const { readDB, writeDB } = require('../lib/db');
const { requireAuth } = require('../lib/auth');

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Public: list published news, newest first
router.get('/', (req, res) => {
  const db = readDB();
  const published = db.news
    .filter((n) => n.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(published);
});

// Admin: list everything (drafts included) -- must be defined BEFORE '/:id'
router.get('/admin/all', requireAuth, (req, res) => {
  const db = readDB();
  const all = [...db.news].sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(all);
});

// Public: single published news item
router.get('/:id', (req, res) => {
  const db = readDB();
  const item = db.news.find((n) => n.id === req.params.id);
  if (!item || !item.published) {
    return res.status(404).json({ error: 'Hin argamne (not found)' });
  }
  res.json(item);
});

// Admin: create news
router.post('/', requireAuth, (req, res) => {
  const { title, body, imageUrl, published } = req.body || {};

  if (!title || !body) {
    return res.status(400).json({ error: 'Mata duree fi ergaa barbaachisa (title and body required)' });
  }

  const db = readDB();
  const item = {
    id: newId(),
    title: String(title),
    body: String(body),
    imageUrl: imageUrl ? String(imageUrl) : '',
    date: new Date().toISOString(),
    published: published !== false
  };

  db.news.push(item);
  writeDB(db);
  res.status(201).json(item);
});

// Admin: update news
router.put('/:id', requireAuth, (req, res) => {
  const db = readDB();
  const idx = db.news.findIndex((n) => n.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Hin argamne (not found)' });
  }

  const { title, body, imageUrl, published } = req.body || {};
  if (title !== undefined) db.news[idx].title = String(title);
  if (body !== undefined) db.news[idx].body = String(body);
  if (imageUrl !== undefined) db.news[idx].imageUrl = String(imageUrl);
  if (published !== undefined) db.news[idx].published = !!published;

  writeDB(db);
  res.json(db.news[idx]);
});

// Admin: delete news
router.delete('/:id', requireAuth, (req, res) => {
  const db = readDB();
  const idx = db.news.findIndex((n) => n.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Hin argamne (not found)' });
  }

  const [removed] = db.news.splice(idx, 1);
  writeDB(db);
  res.json({ ok: true, removed });
});

module.exports = router;
