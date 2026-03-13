import 'dotenv/config'
import { readFileSync } from 'fs'
import pg from 'pg'

const { Pool } = pg

///==========================================================
/// DB CONNECTION
///==========================================================

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

///==========================================================
/// HELPERS
///==========================================================

// inserts a book if it doesn't already exist, returns its DB id
const upsertBook = async (poem) => {
  const existing = await pool.query(
    'SELECT id FROM books WHERE book_id = $1',
    [poem.bookbup]
  )

  if (existing.rows.length > 0) {
    return existing.rows[0].id
  }

  const result = await pool.query(
    `INSERT INTO books (name, name_urdu, book_id, published)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [poem.bookName, poem.bookNameUrdu, poem.bookbup, poem.bookPublished]
  )

  console.log(`  ✓ Inserted book: ${poem.bookName}`)
  return result.rows[0].id
}

// inserts a poem if it doesn't already exist, returns its DB id
const upsertPoem = async (bookDbId, poem) => {
  const existing = await pool.query(
    'SELECT id FROM poems WHERE book_id = $1 AND poem_no = $2',
    [bookDbId, poem.orderNo]
  )

  if (existing.rows.length > 0) {
    return existing.rows[0].id
  }

  const result = await pool.query(
    `INSERT INTO poems (book_id, poem_no, name, name_urdu)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [bookDbId, poem.orderNo, poem.english?.split('\n')[0]?.slice(0, 100) || '', '']
  )

  return result.rows[0].id
}

// inserts a verse, skips if already exists
const insertVerse = async (bookDbId, poemDbId, verseNo, poem) => {
  const existing = await pool.query(
    'SELECT id FROM verses WHERE poem_id = $1 AND verse_no = $2',
    [poemDbId, verseNo]
  )

  if (existing.rows.length > 0) return

  await pool.query(
    `INSERT INTO verses (book_id, poem_id, verse_no, urdu, english)
     VALUES ($1, $2, $3, $4, $5)`,
    [bookDbId, poemDbId, verseNo, poem.urdu, poem.english]
  )
}

///==========================================================
/// MAIN SEED
///==========================================================

const main = async () => {
  console.log('IqbalAPI Seed Script')
  console.log('====================')

  // load JSON
  const raw = readFileSync('./data/iqbal_poems.json', 'utf-8')
  const poems = JSON.parse(raw)
  console.log(`Loaded ${poems.length} poems from iqbal_poems.json\n`)

  let insertedVerses = 0
  let insertedPoems = 0
  let skipped = 0

  for (let i = 0; i < poems.length; i++) {
    const poem = poems[i]
    process.stdout.write(`[${i + 1}/${poems.length}] orderNo ${poem.orderNo}... `)

    try {
      // 1. upsert book
      const bookDbId = await upsertBook(poem)

      // 2. upsert poem
      const poemDbId = await upsertPoem(bookDbId, poem)
      insertedPoems++

      // 3. insert verse
      // each poem from scraper is treated as one verse
      // verse_no is sequential within each poem
      await insertVerse(bookDbId, poemDbId, 1, poem)
      insertedVerses++

      process.stdout.write('✓\n')

    } catch (err) {
      process.stdout.write(`✗ ${err.message}\n`)
      skipped++
    }
  }

  console.log('\n====================')
  console.log(`✓ Done.`)
  console.log(`  Poems inserted:  ${insertedPoems}`)
  console.log(`  Verses inserted: ${insertedVerses}`)
  console.log(`  Skipped:         ${skipped}`)

  await pool.end()
}

main()