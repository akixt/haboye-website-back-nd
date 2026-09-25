# Haboye General Trading PLC — Website + Admin Panel

Kun website Haboye General Trading PLC kan admin panel, login, dashboard,
fi news (oduu) system qabu.

## Wanta ida'ame (What was added)

- **Backend**: Node.js + Express
- **Database**: faayilii JSON salphaa (`data/db.json`) — deploy salphaa, native build hin barbaachisu
- **Admin login**: username/password (bcrypt hashed), session JWT (httpOnly cookie)
- **Admin dashboard**: `/admin/dashboard.html` — oduu ida'uu, gulaaluu, haquu
- **News section**: Fuula jalqabaa (`index.html`) irratti "Oduu" jedhu jira, kan admin-ni
  post godhu hunda automatically argisiisu (`/api/news`)

## Faayilii ijoo (Key files)

```
server.js              -> server jalqabu
lib/db.js               -> JSON database (admin + news)
lib/auth.js             -> JWT login/session logic
routes/auth.js          -> /api/auth/login, /logout, /me
routes/news.js          -> /api/news (public GET, admin POST/PUT/DELETE)
scripts/seed.js         -> admin account jalqabaa uuma
public/index.html       -> fuula jalqabaa (news section + fetch script dabalame)
public/about.html
public/products.html
public/faq.html
public/admin/login.html      -> admin login page
public/admin/dashboard.html  -> admin dashboard (oduu management)
```

## Local test (mataa keessan irratti yaaluuf)

```bash
npm install
cp .env.example .env
# .env keessatti ADMIN_USERNAME fi ADMIN_PASSWORD jijjiiraa
npm run seed
npm start
```

Ergasii browser keessan `http://localhost:3000` bani.
Admin: `http://localhost:3000/admin/login.html`

## Deploy (Render — bilisaa/free tier)

1. Repo kana GitHub irratti kaa'aa (ykn faayilii kana directly Render irratti fe'aa).
2. https://render.com irratti "New Web Service" filadhaa.
3. Repo/faayilii walitti qabaa kana wal qabsiisaa.
4. Build command: `npm install`
5. Start command: `npm start`
6. **Environment Variables** keessatti kanneen armaan gadii dabalaa:
   - `JWT_SECRET` = jecha dheeraa, kan namni tokko illee hin beekne
   - `ADMIN_USERNAME` = maqaa fayyadamaa filattan
   - `ADMIN_PASSWORD` = jecha darbii cimaa filattan
   - `NODE_ENV` = `production`
7. Deploy erga xumurtanii booda, **Shell** tab (ykn "one-off job") banaa,
   `npm run seed` fiixaan baasaa — kun admin account isin jalqaba uumtan
   database irratti galcha.
8. Website keessan `https://<app-name>.onrender.com` irratti argama.
   Admin: `https://<app-name>.onrender.com/admin/login.html`

### NB (Important)

- Render-n free tier free disk-n **persistent miti** — yeroo dheeraa deploy
  hin taane (inactive) yoo ta'e, `data/db.json` (oduu fi admin account) balleessuu
  danda'a. Kanaaf:
  - Yeroo hunda deploy booda `npm run seed` deebi'aa fiixaan baasaa, ykn
  - Render's **paid persistent disk** feature fayyadamaa, ykn
  - Railway ykn hosting biraa kan persistent disk bilisaa qabu fayyadamuu.
- Jecha darbii (password) fi `JWT_SECRET` namni biraa akka hin arganne eegaa —
  `.env` faayilii kana git irratti hin kaa'inaa (`.gitignore` keessatti jira).

## Admin dashboard fayyadamuu (How to use the dashboard)

1. `/admin/login.html` seenaa (maqaa fayyadamaa fi jecha darbii isin `npm run seed`
   keessatti kennitan fayyadamaa).
2. Dashboard irratti **"Oduu Haaraa Ida'i"** jalatti mata duree, ergaa, fi
   (yoo barbaachise) suuraa URL galchaa.
3. **"Published"** checkbox-ni mul'achuu/dhoksuu Website irratti to'ata.
4. **SAVE** tuqaa — oduun sun yeroma sanatti fuula jalqabaa (`index.html`)
   irratti "Oduu" section jalatti mul'ata.
5. Oduu gulaaluuf ykn haquuf, list jala jiru irraa **Gulaali** ykn **Haqi**
   tuqaa.
