// Lightweight file-based JSON database.
// Good enough for a small business site: one admin account + a news list.
// No native build step required, so it deploys cleanly on any Node host
// (Render, Railway, a VPS, etc.) without extra build tools.

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

function ensureDB() {
  if (!fs.existsSync(DB_PATH)) {
    const initial = { admin: null, news: [] };
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
  }
}

function readDB() {
  ensureDB();
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  try {
    return JSON.parse(raw);
  } catch (e) {
    // Corrupt file safety net: back it up and start fresh rather than crash.
    fs.copyFileSync(DB_PATH, DB_PATH + '.broken-' + Date.now());
    const initial = { admin: null, news: [] };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }
}

function writeDB(data) {
  ensureDB();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = { readDB, writeDB, DB_PATH };
