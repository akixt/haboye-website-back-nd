const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'please-change-this-secret';

function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '12h' });
}

function requireAuth(req, res, next) {
  const token = req.cookies && req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Hin seenamne (not logged in)' });
  }
  try {
    req.admin = jwt.verify(token, SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Seensi dhumateera, irra deebi\'aa seenaa (session expired, please log in again)' });
  }
}

module.exports = { signToken, requireAuth, SECRET };
