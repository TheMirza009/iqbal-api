---
sidebar_position: 5
title: Endpoints
---

# Endpoints

Full reference for every route available in IqbalAPI.

Base URL: `https://iqbal-api.up.railway.app`

---

## Root

```
GET /
```

Returns API metadata — name, version, description, and a map of all available endpoints.

---

## Books

| Method | Path | Description |
|--------|------|-------------|
| GET | `/books` | All 4 books (lightweight) |
| GET | `/books?complete=true` | All books with nested poems and verses |
| GET | `/books?complete=true&count=2&page=1` | Paginated full content |
| GET | `/books/:id` | Single book with nested poems and verses |
| GET | `/books/random` | Random book |
| GET | `/books?count=N` | First N books |
| GET | `/books?count=N&page=P` | Paginated books |

---

## Poems

| Method | Path | Description |
|--------|------|-------------|
| GET | `/poems` | All poems with verses |
| GET | `/poems/:id` | Single poem with its verses |
| GET | `/poems/random` | Random poem with verses |
| GET | `/poems?count=N` | First N poems |
| GET | `/poems?count=N&page=P` | Paginated poems |

---

## Verses

| Method | Path | Description |
|--------|------|-------------|
| GET | `/verses` | All verses |
| GET | `/verses/:id` | Single verse by ID |
| GET | `/verses/random` | Random couplet (2 verses) |
| GET | `/verses?count=N` | First N verses |
| GET | `/verses?count=N&page=P` | Paginated verses |

---

## Search

| Method | Path | Description |
|--------|------|-------------|
| GET | `/search?term=TERM` | Search across all content |
| GET | `/search?term=TERM&count=N` | First N results |
| GET | `/search?term=TERM&count=N&page=P` | Paginated search results |

See [Search](/docs/Reference/search) for full details on the search response shape.

---

## Pagination

All collection endpoints support `count` and `page`. See [Pagination](/docs/Reference/pagination) for details.