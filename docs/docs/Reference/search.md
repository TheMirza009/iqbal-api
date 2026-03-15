---
sidebar_position: 6
title: Search
---

# Search

Search across the entire collection in a single request.

---

## Endpoint

```
GET /search?term=YOUR_TERM
```

---

## What Gets Searched

| Field | Description |
|-------|-------------|
| `verses.urdu` | Urdu verse text |
| `verses.english` | English translation |
| `poems.name` | English poem title |
| `poems.name_urdu` | Urdu poem title |
| `books.name` | English book name |
| `books.name_urdu` | Urdu book name |

You can search in English or Urdu — both work:

```
/search?term=self
/search?term=خودی
```

---

## Response Shape

Every search response always includes `total` and `meta`:

```json
{
  "total": 284,
  "meta": {
    "books": 2,
    "poems": 12,
    "verses": 47
  },
  "books": [...],
  "poems": [...],
  "verses": [...]
}
```

| Field | Description |
|-------|-------------|
| `total` | Total matched verse count across all pages |
| `meta.books` | Number of distinct books in this response |
| `meta.poems` | Number of distinct poems in this response |
| `meta.verses` | Number of verses in this response |
| `books` | Distinct books containing matches |
| `poems` | Distinct poems containing matches |
| `verses` | Matched verses |

---

## Smart Matching

**Single book match** — if your term matches exactly one book with no verse matches, only the book is returned:

```
GET /search?term=Gabriel's Wing
```

```json
{
  "total": 1,
  "meta": { "books": 1, "poems": 0, "verses": 0 },
  "books": [{ "id": 2, "name": "Gabriel's Wing", "name_urdu": "بالِ جبریل" }],
  "poems": [],
  "verses": []
}
```

**Single poem match** — if your term matches exactly one poem with no verse matches, that poem is returned with its opening verse.

---

## Multi-Word Search

Multi-word terms are treated as AND queries — all words must appear together:

```
GET /search?term=self decree
```

Returns only verses where both "self" and "decree" appear.

---

## Paginated Search

```
GET /search?term=khudi&count=10&page=1
```

```json
{
  "page": 1,
  "count": 10,
  "total": 284,
  "meta": {
    "books": 2,
    "poems": 12,
    "verses": 10
  },
  "books": [...],
  "poems": [...],
  "verses": [...]
}
```