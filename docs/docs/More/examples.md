---
sidebar_position: 9
title: Examples
---

# Examples

Ready-to-use code examples for common use cases.

---

## curl

```bash
# Get a random couplet
curl https://iqbal-api.up.railway.app/verses/random

# Search for a term
curl "https://iqbal-api.up.railway.app/search?term=khudi"

# Get all books
curl https://iqbal-api.up.railway.app/books

# Get paginated verses
curl "https://iqbal-api.up.railway.app/verses?count=10&page=1"
```

---

## JavaScript (fetch)

```javascript
// Get a random couplet
const res = await fetch('https://iqbal-api.up.railway.app/verses/random');
const couplet = await res.json();
console.log(couplet[0].english);

// Search
const search = await fetch('https://iqbal-api.up.railway.app/search?term=self&count=10&page=1');
const results = await search.json();
console.log(`Found ${results.total} matches`);

// Get all books
const books = await fetch('https://iqbal-api.up.railway.app/books');
const data = await books.json();
data.forEach(book => console.log(book.name));
```

---

## Dart / Flutter

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

const baseUrl = 'https://iqbal-api.up.railway.app';

// Get a random couplet
Future<List<dynamic>> getRandomCouplet() async {
  final response = await http.get(Uri.parse('$baseUrl/verses/random'));
  if (response.statusCode == 200) {
    return jsonDecode(response.body);
  }
  throw Exception('Failed to load couplet');
}

// Search
Future<Map<String, dynamic>> search(String term, {int count = 10, int page = 1}) async {
  final uri = Uri.parse('$baseUrl/search').replace(queryParameters: {
    'term': term,
    'count': count.toString(),
    'page': page.toString(),
  });
  final response = await http.get(uri);
  if (response.statusCode == 200) {
    return jsonDecode(response.body);
  }
  throw Exception('Search failed');
}

// Get single poem
Future<Map<String, dynamic>> getPoem(int id) async {
  final response = await http.get(Uri.parse('$baseUrl/poems/$id'));
  if (response.statusCode == 200) {
    return jsonDecode(response.body);
  }
  throw Exception('Poem not found');
}
```

---

## Python

```python
import requests

BASE_URL = 'https://iqbal-api.up.railway.app'

# Get a random couplet
couplet = requests.get(f'{BASE_URL}/verses/random').json()
for verse in couplet:
    print(verse['english'])

# Search
results = requests.get(f'{BASE_URL}/search', params={'term': 'self', 'count': 10}).json()
print(f"Found {results['total']} matches")

# Get paginated poems
poems = requests.get(f'{BASE_URL}/poems', params={'count': 5, 'page': 2}).json()
print(f"Page {poems['page']} of {poems['total'] // 5 + 1}")
```

---

## Daily Verse Widget (JavaScript)

A simple widget that displays a random couplet — useful for embedding in any webpage:

```javascript
async function renderDailyVerse(containerId) {
  const container = document.getElementById(containerId);
  
  try {
    const res = await fetch('https://iqbal-api.up.railway.app/verses/random');
    const [verse1, verse2] = await res.json();
    
    container.innerHTML = `
      <div class="verse-widget">
        <p class="urdu" dir="rtl">${verse1.urdu}</p>
        <p class="urdu" dir="rtl">${verse2.urdu}</p>
        <p class="english">${verse1.english}</p>
        <p class="english">${verse2.english}</p>
      </div>
    `;
  } catch (error) {
    container.innerHTML = '<p>Could not load verse.</p>';
  }
}

renderDailyVerse('verse-container');
```