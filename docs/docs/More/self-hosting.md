---
sidebar_position: 10
title: Self-Hosting
---

# Self-Hosting

Run IqbalAPI locally or deploy your own instance.

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 20+ |
| PostgreSQL | 14+ |

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/TheMirza009/iqbal-api.git
cd iqbal-api

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
```

---

## Environment Variables

Edit `.env` with your PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=iqbal_api
DB_USER=postgres
DB_PASSWORD=yourpassword
```

---

## Database Setup

Create the database in PostgreSQL:

```sql
CREATE DATABASE iqbal_api;
```

Then import the schema and data using the provided dump file (available in the repository releases):

```bash
psql -U postgres -d iqbal_api < iqbal_dump.sql
```

---

## Run the Server

```bash
# Development (hot reload)
npm run dev

# Production
npm start
```

The server starts at `http://localhost:3000`.

---

## Deploy to Railway

1. Fork the repository on GitHub
2. Create a new project on [Railway](https://railway.app)
3. Add a PostgreSQL service
4. Connect your forked GitHub repo as a second service
5. Add `DATABASE_URL` as an environment variable referencing your PostgreSQL service
6. Import data using the public connection string:

```bash
psql "postgresql://postgres:password@host:port/railway" -f iqbal_dump.sql
```

Railway will auto-deploy on every push to your main branch.

---

## Rate Limiting

The default rate limit is **100 requests per 15 minutes** per IP. To change this, edit `utils/limiter.js`:

```javascript
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                    // requests per window
});
```

---

## License

MIT — use it, fork it, build on it.

**[View on GitHub →](https://github.com/TheMirza009/iqbal-api)**