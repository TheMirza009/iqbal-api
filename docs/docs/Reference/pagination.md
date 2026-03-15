---
sidebar_position: 7
title: Pagination
---

# Pagination

All collection endpoints — `/books`, `/poems`, `/verses`, and `/search` — support pagination via count and page query parameters.

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `count` | integer | No | Number of results per page |
| `page` | integer | No | Page number — only works alongside `count` |

---

## Usage


| Method | Query | Returns | Metadata |
|--------|-------|---------|----------|
| GET | `/verses?count=20` | First 20 verses | No |
| GET | `/verses?count=20&page=1` | First 20 verses | Yes |
| GET | `/verses?count=20&page=2` | Verses 21–40 | Yes |
| GET | `/verses?count=20&page=3` | Verses 41–60 | Yes |


---

## Paginated Response Shape

When both `count` and `page` are provided the response includes metadata:

```json
{
  "page": 2,
  "count": 20,
  "total": 6420,
  "verses": [...]
}
```

| Field | Description |
|-------|-------------|
| `page` | Current page number |
| `count` | Results per page |
| `total` | Total records in the full dataset |
| `verses` / `poems` / `books` | The results array |

---

## Without Pagination

`count` alone returns the first N results without a metadata wrapper — just a plain array:

```json
[
  { "id": 1, ... },
  { "id": 2, ... }
]
```

---

## Across All Endpoints

```
/books?count=2&page=1
/poems?count=5&page=3
/verses?count=20&page=10
/search?term=خودی&count=10&page=2
```