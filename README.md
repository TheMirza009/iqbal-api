<div align="center">

# IqbalAPI
### A free, open REST API for Allama Iqbal's poetry.

[![Node.js](https://img.shields.io/badge/Node.js-24-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](/)

</div>

---

## 📖 What is IqbalAPI?

**IqbalAPI** is a structured, developer-friendly REST API for the poetry of **Allama Iqbal** — one of the most significant poets in Pakistani and Islamic history.

No existing API provided clean, structured access to his work with English translations. IqbalAPI fills that gap — giving developers access to his books, poems, and verses with a single HTTP request.

**Why I built this?**
> I noticed there was no structured API for Iqbal's poetry anywhere. The data existed on the web but was inaccessible to developers. So I scraped, cleaned, structured, and served it — because it deserves to be built on top of.

---

## ✨ Features

- 📚 **Books, Poems & Verses** — fully structured and relational
- 🔀 **Random endpoints** — get a random verse, poem, or book instantly
- 🔍 **Search** — search across Urdu text, English translations, and poem names
- 🌐 **CORS enabled** — call it from any browser, Flutter app, or client
- 🚦 **Rate limiting** — 100 requests per 15 minutes per IP
- ⚡ **Fast** — PostgreSQL-backed with connection pooling

---

## 🔌 Endpoints

### Root
```
GET /                          → API info and available endpoints
```

### Books
```
GET /books                     → all books
GET /books/:id                 → single book with its poems and verses
GET /books/random              → random book
```

### Poems
```
GET /poems                     → all poems with their verses
GET /poems/:id                 → single poem with its verses
GET /poems/random              → random poem with its verses
```

### Verses
```
GET /verses                    → all verses
GET /verses/:id                → single verse by ID
GET /verses/random             → random verse
GET /verses?count=5            → first N verses
```

### Search
```
GET /search?term=khudi         → search across verses, poems, and books
```

---

## 📦 Example Response

**`GET /verses/random`**
```json
{
  "id": 1,
  "verse_no": 1,
  "urdu": "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے\nخدا بندے سے خود پُوچھے، بتا تیری رضا کیا ہے",
  "english": "Raise yourself so high that before every decree\nGod himself asks you: what is your wish?"
}
```

**`GET /poems/1`**
```json
{
  "id": 1,
  "book_id": 1,
  "poem_no": 264,
  "name": "What should I ask the sages about my origin",
  "name_urdu": "خِردمندوں سے کیا پُوچھوں",
  "verses": [
    {
      "id": 1,
      "verse_no": 1,
      "urdu": "خِردمندوں سے کیا پُوچھوں...",
      "english": "What should I ask the sages..."
    }
  ]
}
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Node.js 24 | Server runtime |
| **Framework** | Express 5 | HTTP routing and middleware |
| **Database** | PostgreSQL | Relational data storage |
| **DB Client** | node-postgres (pg) | PostgreSQL connection pooling |
| **Other** | cors, express-rate-limit, dotenv | Security and configuration |

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | `20+` |
| PostgreSQL | `14+` |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/TheMirza009/iqbal-api.git
cd iqbal-api

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
# Fill in your PostgreSQL credentials

# 4. Run the server
npm run dev
```

### Environment Variables

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=iqbal_api
DB_USER=postgres
DB_PASSWORD=yourpassword
```

---

## 🗄️ Database Schema

```sql
books    → id, name, name_urdu, book_id, published
poems    → id, book_id, poem_no, name, name_urdu
verses   → id, book_id, poem_id, verse_no, urdu, english
```

---

## 👤 Author

**Mirza AbdulMoeed**

[![GitHub](https://img.shields.io/badge/GitHub-TheMirza009-181717?style=for-the-badge&logo=github)](https://github.com/TheMirza009)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Abdul_Moeed-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/TheMirza009)

---

## ⚖️ License

MIT License — use it, build on it, just credit the work.

The poetry content belongs to the public domain, sourced from [AllamaIqbal.com](https://www.allamaiqbal.com/). Allama Iqbal passed away in 1938.

---

<div align="center">

**Built with ☕ in Express &nbsp;·&nbsp; For the poetry that deserves to be accessible.**

*If you find this useful, consider leaving a ⭐ on GitHub!*

</div>