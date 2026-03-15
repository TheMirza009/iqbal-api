---
sidebar_position: 2
title: Books
---

# Books

The API contains four complete books of Allama Iqbal's Urdu poetry.

---

## The Collection

| ID | Name | اردو | Published |
|----|------|------|-----------|
| 1 | Bang-e-Dra | بانگِ درا | 1924 |
| 2 | Gabriel's Wing | بالِ جبریل | 1935 |
| 3 | Zarb-e-Kalim | ضربِ کلیم | 1936 |
| 4 | Armughan-e-Hijaz | ارمغانِ حجاز | 1938 |

---

## Bang-e-Dra — بانگِ درا (1924)

*The Call of the Bell*

Iqbal's first and largest Urdu collection. It spans three distinct phases of his life and thought — from early romantic and nationalist poetry, through his years in Europe, to his mature Islamic philosophical work. Contains some of his most beloved poems including *Shikwa* and *Jawab-e-Shikwa*.

---

## Gabriel's Wing — بالِ جبریل (1935)

*Bal-e-Jibril*

Widely considered his finest Urdu work. Inspired by his visit to the Cordoba mosque in Spain, it contains deeply devotional and mystical verse alongside sharp social critique. The title refers to the angel Gabriel — a symbol of divine inspiration.

---

## Zarb-e-Kalim — ضربِ کلیم (1936)

*The Rod of Moses*

A forceful critique of Western materialism, colonialism, and the loss of Muslim identity. The title alludes to Moses striking his rod — an act of decisive spiritual power. More polemical in tone than Gabriel's Wing, but equally important.

---

## Armughan-e-Hijaz — ارمغانِ حجاز (1938)

*Gift of the Hijaz*

Iqbal's final collection, published posthumously in the year of his death. Contains both Urdu and Persian verse. The Hijaz refers to the region of Mecca and Medina — the spiritual heart of Islam. A deeply personal and reflective final work.

---

## Endpoints

```
GET /books                    → all 4 books (lightweight)
GET /books?complete=true      → all books with nested poems and verses
GET /books/:id                → single book with nested poems and verses
GET /books/random             → random book
GET /books?count=2&page=1     → paginated
```

## Example Response

**`GET /books`**

```json
[
  { "id": 1, "name": "Bang-e-Dra", "name_urdu": "بانگِ درا", "book_id": 22, "published": 1924 },
  { "id": 2, "name": "Gabriel's Wing", "name_urdu": "بالِ جبریل", "book_id": 24, "published": 1935 },
  { "id": 3, "name": "Zarb-e-Kalim", "name_urdu": "ضربِ کلیم", "book_id": 23, "published": 1936 },
  { "id": 4, "name": "Armughan-e-Hijaz", "name_urdu": "ارمغانِ حجاز", "book_id": 31, "published": 1938 }
]
```