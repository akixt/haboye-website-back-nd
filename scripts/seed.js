require('dotenv').config();

const bcrypt = require('bcryptjs');
const { readDB, writeDB } = require('../lib/db');

const username = process.env.ADMIN_USERNAME || 'admin';
const password = process.env.ADMIN_PASSWORD || 'Haboye@2026';

const db = readDB();
db.admin = {
  username,
  passwordHash: bcrypt.hashSync(password, 10)
};
writeDB(db);

console.log('Admin account tolfameera / Admin account ready:');
console.log('  Username:', username);
console.log('  Password:', password);
console.log('');
console.log('NB: seenanii booda jecha darbii kana jijjiiraa!');
console.log('(Please log in and change this password/username via your .env file.)');
