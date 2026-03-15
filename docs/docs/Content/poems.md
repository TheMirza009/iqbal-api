---
sidebar_position: 3
title: Poems
---

# Poems

Each poem belongs to a book and contains multiple verses. Poems have both English and Urdu titles.

---

## Endpoints

```
GET /poems                     → all poems with their verses
GET /poems/:id                 → single poem with its verses
GET /poems/random              → random poem with its verses
GET /poems?count=10            → first 10 poems
GET /poems?count=10&page=2     → poems 11–20
```

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
      "urdu": "خِردمندوں سے کیا پُوچھوں کہ میری ابتدا کیا ہے",
      "english": "What should I ask the sages about my origin"
    },
    {
      "id": 2,
      "verse_no": 2,
      "urdu": "خودی کا سرِ نہاں لا الہ الا اللہ",
      "english": "The secret of the self is hidden in the words: there is no god but God"
    }
  ]
}
```

---

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Unique poem ID in the database |
| `book_id` | integer | ID of the parent book |
| `poem_no` | integer | Poem's order number within the book |
| `name` | string | English title |
| `name_urdu` | string | Urdu title |
| `verses` | array | Array of verse objects — see [Verses](/docs/verses) |

---

## Paginated Response

When `count` and `page` are both provided:

```json
{
  "page": 2,
  "count": 10,
  "total": 468,
  "poems": [...]
}
```