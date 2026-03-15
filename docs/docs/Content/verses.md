---
sidebar_position: 4
title: Verses
---

# Verses

A verse is the smallest unit in the API. Every verse belongs to both a poem and a book, and contains both the original Urdu text and its English translation.

---

## Endpoints

```
GET /verses                    → all verses
GET /verses/:id                → single verse by ID
GET /verses/random             → random couplet (2 verses)
GET /verses?count=10           → first 10 verses
GET /verses?count=10&page=2    → verses 11–20
```

---

## Random Couplet

`/verses/random` returns **two verses** — a complete couplet, not a single verse. Iqbal's poetry is structured in couplets (pairs), so returning a lone verse would break the meaning.

The pairing logic:
- If the random verse is **odd-numbered** → returns that verse + the next one
- If the random verse is **even-numbered** → returns the previous verse + that one

**`GET /verses/random`**
```json
[
  {
    "id": 5707,
    "verse_no": 2,
    "urdu": "خودی کا سرِ نہاں لا الہ الا اللہ",
    "english": "The secret of the self is hidden in the words: there is no god but God"
  },
  {
    "id": 5708,
    "verse_no": 3,
    "urdu": "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے",
    "english": "Develop the self so that before every decree"
  }
]
```

---

## Single Verse

Returns a specific verse based on the given `id`.

**`GET /verses/42`**
```json
{
  "id": 42,
  "book_id": 1,
  "poem_id": 5,
  "verse_no": 3,
  "urdu": "تو شاہیں ہے پرواز ہے کام تیرا",
  "english": "You are an eagle, soaring is your destiny"
}
```

---

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Unique verse ID |
| `book_id` | integer | ID of the parent book |
| `poem_id` | integer | ID of the parent poem |
| `verse_no` | integer | Position within the poem (1, 2, 3...) |
| `urdu` | string | Original Urdu text |
| `english` | string | English translation |

---

## Paginated Response

```json
{
  "page": 3,
  "count": 20,
  "total": 6420,
  "verses": [...]
}
```