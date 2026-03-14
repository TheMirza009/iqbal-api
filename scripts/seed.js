import 'dotenv/config'
import { readFileSync } from 'fs'
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

///==========================================================
/// DATABASE HELPERS
///==========================================================

const upsertBook = async (p) => {
  const res = await pool.query('SELECT id FROM books WHERE book_id = $1', [p.bookbup])
  if (res.rows.length > 0) return res.rows[0].id

  const ins = await pool.query(
    `INSERT INTO books (name, name_urdu, book_id, published) 
     VALUES ($1, $2, $3, $4) RETURNING id`,
    [p.bookName, p.bookNameUrdu, p.bookbup, p.bookPublished]
  )
  return ins.rows[0].id
}

const upsertPoem = async (bookDbId, poemNo, nameEn, nameUr) => {
  // Check if this poem number already exists for this book
  const res = await pool.query(
    'SELECT id FROM poems WHERE book_id = $1 AND poem_no = $2', 
    [bookDbId, poemNo]
  )
  
  if (res.rows.length > 0) {
    // Update the name in case we are fixing the "first line as name" issue
    await pool.query(
      'UPDATE poems SET name = $1, name_urdu = $2 WHERE id = $3',
      [nameEn, nameUr, res.rows[0].id]
    )
    return res.rows[0].id
  }

  const ins = await pool.query(
    `INSERT INTO poems (book_id, poem_no, name, name_urdu) 
     VALUES ($1, $2, $3, $4) RETURNING id`,
    [bookDbId, poemNo, nameEn, nameUr]
  )
  return ins.rows[0].id
}

const insertVerse = async (bookDbId, poemDbId, verseNo, urdu, english) => {
  // Prevent duplicate verses if script is re-run
  const res = await pool.query(
    'SELECT id FROM verses WHERE poem_id = $1 AND verse_no = $2',
    [poemDbId, verseNo]
  )
  if (res.rows.length > 0) return

  await pool.query(
    `INSERT INTO verses (book_id, poem_id, verse_no, urdu, english) 
     VALUES ($1, $2, $3, $4, $5)`,
    [bookDbId, poemDbId, verseNo, urdu, english]
  )
}

///==========================================================
/// MAIN EXECUTION
///==========================================================

const main = async () => {
  const filePaths = process.argv.slice(2)
  if (filePaths.length === 0) {
    console.error('❌ Usage: node seed.js file1.json file2.json ...')
    process.exit(1)
  }

  console.log('🚀 Starting Seed: Verse Expansion Mode')
  console.log('--------------------------------------')

  let totalBooks = 0
  let totalPoems = 0
  let totalVerses = 0

  for (const path of filePaths) {
    console.log(`📖 Processing: ${path}`)
    const rawData = JSON.parse(readFileSync(path, 'utf-8'))
    
    // Sort logically so database IDs follow the sequence
    rawData.sort((a, b) => a.orderNo - b.orderNo)

    for (const p of rawData) {
      try {
        // 1. Split stanzas into individual lines (verses)
        const uLines = p.urdu ? p.urdu.split(/\r?\n/).filter(l => l.trim()) : []
        const eLines = p.english ? p.english.split(/\r?\n/).filter(l => l.trim()) : []

        // 2. Define poem names as the first line of text
        const nameUr = uLines[0] ? uLines[0].substring(0, 200) : 'Untitled'
        const nameEn = eLines[0] ? eLines[0].substring(0, 200) : 'Untitled'

        // 3. Database Operations
        const bookDbId = await upsertBook(p)
        const poemDbId = await upsertPoem(bookDbId, p.orderNo, nameEn, nameUr)

        // 4. Insert each line as a separate verse
        const verseCount = Math.max(uLines.length, eLines.length)
        for (let v = 0; v < verseCount; v++) {
          await insertVerse(bookDbId, poemDbId, v + 1, uLines[v] || '', eLines[v] || '')
          totalVerses++
        }

        totalPoems++
        process.stdout.write(`  ✔ [Poem ${p.orderNo}] ${nameEn.slice(0, 30)}... (${verseCount} verses)\n`)
        
      } catch (err) {
        console.error(`  [Poem ${p.orderNo}] Error: ${err.message}`)
      }
    }
  }

  console.log('--------------------------------------')
  console.log(`✅ SEED COMPLETE`)
  console.log(`📊 Poems Processed: ${totalPoems}`)
  console.log(`📊 Total Verses Created: ${totalVerses}`)
  
  await pool.end()
}

main()