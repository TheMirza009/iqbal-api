---
sidebar_position: 8
title: Response Schemas
---

# Response Schemas

The shape of every object returned by IqbalAPI.

---

## Book

```json
{
  "id": 2,
  "name": "Gabriel's Wing",
  "name_urdu": "بالِ جبریل",
  "book_id": 24,
  "published": 1935
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Database ID |
| `name` | string | English name |
| `name_urdu` | string | Urdu name |
| `book_id` | integer | AllamaIqbal.com internal reference ID |
| `published` | integer | Year of publication |

---

## Poem

```json
{
  "id": 1,
  "book_id": 1,
  "poem_no": 264,
  "name": "What should I ask the sages about my origin",
  "name_urdu": "خِردمندوں سے کیا پُوچھوں کہ میری ابتدا کیا ہے"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Database ID |
| `book_id` | integer | Parent book ID |
| `poem_no` | integer | Order number within the book |
| `name` | string | English title |
| `name_urdu` | string | Urdu title |

When returned from `/poems/:id` or `/poems/random`, includes a `verses` array.

---

## Verse

```json
{
  "id": 5708,
  "book_id": 2,
  "poem_id": 264,
  "verse_no": 3,
  "urdu": "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے",
  "english": "Develop the self so that before every decree"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Database ID |
| `book_id` | integer | Parent book ID |
| `poem_id` | integer | Parent poem ID |
| `verse_no` | integer | Position within the poem |
| `urdu` | string | Original Urdu text |
| `english` | string | English translation |

---

## Paginated Response Wrapper

When `count` and `page` are both provided, results are wrapped:

```json
{
  "page": 1,
  "count": 10,
  "total": 6420,
  "verses": [...]
}
```

The key holding the array matches the endpoint — `verses`, `poems`, or `books`.

---

## Search Response

```json
{
  "total": 284,
  "meta": {
    "books": 1,
    "poems": 7,
    "verses": 42
  },
  "books": [...],
  "poems": [...],
  "verses": [...]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `total` | integer | Total verse matches across all pages |
| `meta` | object | Count of each type in this response |
| `books` | array | Distinct matched books |
| `poems` | array | Distinct matched poems |
| `verses` | array | Matched verses |

---

## Nested Book (with `?complete=true`)

```json
{
  "id": 1,
  "name": "Bang-e-Dra",
  "name_urdu": "بانگِ درا",
  "published": 1924,
  "poems": [
    {
      "id": 1,
      "poem_no": 1,
      "name": "Poem title",
      "name_urdu": "عنوان",
      "verses": [
        {
          "id": 1,
          "verse_no": 1,
          "urdu": "...",
          "english": "..."
        }
      ]
    }
  ]
}
```