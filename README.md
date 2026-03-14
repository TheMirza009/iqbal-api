<div align="center">

# IqbalAPI

### A free, open REST API for Allama Iqbal's poetry.

[![Node.js](https://img.shields.io/badge/Node.js-24-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](/)

</div>

---

<br>

<div align="center">

**🌐 Live API: [iqbal-api.up.railway.app](https://iqbal-api.up.railway.app)**

</div>

## 📖 What is IqbalAPI?

**IqbalAPI** is a structured, developer-friendly REST API for the poetry of **Allama Iqbal** — one of the most significant poets in South Asian and Islamic history.

No existing API provided clean, structured access to his work with English translations. IqbalAPI fills that gap — giving developers access to his books, poems, and verses with a single HTTP request.

**Why I built this?**

> I noticed there was no structured API for Iqbal's poetry anywhere. The data existed on the web but was inaccessible to developers. So I scraped, cleaned, structured, and served it — because it deserves to be built on top of.

## 📚 Included Books

Currently includes **4 books** of Allama Iqbal's Urdu poetry with English translations:

| #   | Name             | اردو         | Published |
| --- | ---------------- | ------------ | --------- |
| 1   | Bang-e-Dra       | بانگِ درا    | 1924      |
| 2   | Gabriel's Wing   | بالِ جبریل   | 1935      |
| 3   | Zarb-e-Kalim     | ضربِ کلیم    | 1936      |
| 4   | Armughan-e-Hijaz | ارمغانِ حجاز | 1938      |

> More collections may be added in future updates.

---

## ✨ Features

- 📚 **Books, Poems & Verses** — fully structured and relational
- 🔀 **Random endpoints** — get a random verse, poem, or book instantly
- 🔍 **Search** — search across Urdu text, English translations, and poem names
- 📄 **Pagination** — control how much data you get back with `count` and `page`
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
GET /books                          → all 4 books (lightweight)
GET /books?complete=true            → all books with poems and verses nested
GET /books?complete=true&count=2    → paginated full content
GET /books/:id                      → single book with its poems and verses
GET /books/random                   → random book
GET /books?count=5                  → first 5 books
GET /books?count=5&page=2           → 5 books, page 2
```

### Poems

```
GET /poems                     → all poems with their verses
GET /poems/:id                 → single poem with its verses
GET /poems/random              → random poem with its verses
GET /poems?count=5             → first 5 poems
GET /poems?count=5&page=2      → 5 poems, page 2
```

### Verses

```
GET /verses                    → all verses
GET /verses/:id                → single verse by ID
GET /verses/random             → random couplet (2 verses)
GET /verses?count=5            → first 5 verses
GET /verses?count=5&page=2     → 5 verses, page 2
```

### Search

```
GET /search?term=khudi                   → search across verses and poems
GET /search?term=khudi&count=5           → first 5 results
GET /search?term=khudi&count=5&page=2    → 5 results, page 2
```

---

## 📄 Pagination

All collection endpoints support `count` and `page` query parameters.

| Parameter | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| `count`   | integer | Number of results to return    |
| `page`    | integer | Page number (requires `count`) |

When both `count` and `page` are provided, the response includes pagination metadata:

```json
{
  "page": 2,
  "count": 5,
  "total": 48,
  "verses": [...]
}
```

**Examples:**

```
/verses?count=10              → first 10 verses
/verses?count=10&page=2       → verses 11-20
/verses?count=10&page=3       → verses 21-30
/poems?count=5&page=1         → first 5 poems
/search?term=خودی&count=10   → first 10 search results
```

---

## 📦 Example Response

**`GET /verses/random`**

```json
[
  {
    "id": 5708,
    "book_id": 2,
    "poem_id": 264,
    "verse_no": 3,
    "urdu": "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے",
    "english": "Develop the self so that before every decree"
  },
  {
    "id": 5709,
    "book_id": 2,
    "poem_id": 264,
    "verse_no": 4,
    "urdu": "خدا بندے سے خود پُوچھے، بتا تیری رضا کیا ہے",
    "english": "God will ascertain from you: “What is your wish?”"
  }
]
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

**`GET /verses?count=5&page=2`**

```json
{
  "page": 2,
  "count": 5,
  "total": 48,
  "verses": [...]
}
```

**`GET /search?term=khudi`**

```json
{
  "total": 284,
  "meta": {
    "books": 2,
    "poems": 12,
    "verses": 47
  },
  "books": [{ "id": 2, "name": "Gabriel's Wing", "name_urdu": "بالِ جبریل" }],
  "poems": [
    {
      "id": 264,
      "name": "What should I ask the sages about my origin",
      "name_urdu": "خِردمندوں سے کیا پُوچھوں"
    }
  ],
  "verses": [
    {
      "id": 5708,
      "verse_no": 3,
      "urdu": "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے",
      "english": "Develop the self so that before every decree"
    }
  ]
}
```

> **Smart matching** — searching a single book name returns just that book. Searching a single poem name returns that poem with its opening verse.

---

## 🛠️ Tech Stack

| Layer         | Technology                       | Purpose                       |
| ------------- | -------------------------------- | ----------------------------- |
| **Runtime**   | Node.js 24                       | Server runtime                |
| **Framework** | Express 5                        | HTTP routing and middleware   |
| **Database**  | PostgreSQL                       | Relational data storage       |
| **DB Client** | node-postgres (pg)               | PostgreSQL connection pooling |
| **Other**     | cors, express-rate-limit, dotenv | Security and configuration    |

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
| ----------- | ------- |
| Node.js     | `20+`   |
| PostgreSQL  | `14+`   |

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
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Mirza_AbdulMoeed-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/mirza-abdulmoeed009/)

---

## ⚖️ License

MIT License — use it, build on it, just credit the work.

The poetry content belongs to the public domain, sourced from [AllamaIqbal.com](https://www.allamaiqbal.com/). Allama Iqbal passed away in 1938.

---

<div align="center">

**Built with ☕ in Express &nbsp;·&nbsp; For the poetry that deserves to be accessible.**

_If you find this useful, consider leaving a ⭐ on GitHub!_

</div>
