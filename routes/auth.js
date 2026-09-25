const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();
const { readDB } = require('../lib/db');
const { signToken, requireAuth } = require('../lib/auth');

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Maqaa fayyadamaa fi jecha darbii galchaa (enter username and password)' });
  }

  const db = readDB();
  const admin = db.admin;

  if (!admin || admin.username !== username) {
    return res.status(401).json({ error: 'Maqaan fayyadamaa ykn jechi darbii sirrii miti (invalid credentials)' });
  }

  const ok = bcrypt.compareSync(password, admin.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: 'Maqaan fayyadamaa ykn jechi darbii sirrii miti (invalid credentials)' });
  }

  const token = signToken({ username: admin.username });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 12 * 60 * 60 * 1000
  });

  res.json({ ok: true, username: admin.username });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ username: req.admin.username });
});

module.exports = router;
