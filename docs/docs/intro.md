---
sidebar_position: 1
title: Getting Started
---

# Getting Started

IqbalAPI is a free, open REST API serving the complete Urdu poetry of **Allama Iqbal** — across 4 books, with English translations, full-text search, and pagination.

No API key. No sign up. No installation. Just HTTP.

---

## Base URL

```
https://iqbal-api.up.railway.app
```

---

## Quick Test

Open this in your browser right now:

```
https://iqbal-api.up.railway.app/verses/random
```

You'll get a random couplet — two verses from Iqbal's poetry. Every response includes both the original Urdu and the English translation.

---

## The Four Books

IqbalAPI currently includes all four of Iqbal's major Urdu poetry collections:

| Book | اردو | Published |
|------|------|-----------|
| Bang-e-Dra | بانگِ درا | 1924 |
| Gabriel's Wing | بالِ جبریل | 1935 |
| Zarb-e-Kalim | ضربِ کلیم | 1936 |
| Armughan-e-Hijaz | ارمغانِ حجاز | 1938 |

---

## Data Structure

The API is relational — data flows in three levels:

```
Books
  └── Poems
        └── Verses
```

Each **book** contains multiple **poems**. Each **poem** contains multiple **verses**. Every verse has both an Urdu original and an English translation.

---

## Example Response

**`GET /poems/1`**

```json
{
  "id": 1,
  "book_id": 1,
  "poem_no": 264,
  "name": "What should I ask the sages about my origin",
  "name_urdu": "خِردمندوں سے کیا پُوچھوں کہ میری ابتدا کیا ہے",
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

## Rate Limiting

The API is rate limited to **100 requests per 15 minutes** per IP address. This is generous for any reasonable use case. If you need higher limits for a production app, consider self-hosting from the [GitHub repo](https://github.com/TheMirza009/iqbal-api).

---

## Next Steps

- [Endpoints](/docs/endpoints) — full reference for every route
- [Search](/docs/search) — how to search across the entire collection
- [Pagination](/docs/pagination) — controlling response size

---

## Source & License

The API is fully open source under the MIT License.

The **poetry content** is in the public domain — Allama Iqbal passed away in 1938. The data was sourced from [AllamaIqbal.com](https://www.allamaiqbal.com).

**[View on GitHub →](https://github.com/TheMirza009/iqbal-api)**