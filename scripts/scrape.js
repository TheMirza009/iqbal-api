import axios from 'axios'
import * as cheerio from 'cheerio'
import { writeFileSync, readFileSync, readdirSync, mkdirSync, existsSync, renameSync, unlinkSync } from 'fs'

///==========================================================
/// KNOWN BOOKS
/// Add more as you map them on allamaiqbal.com
///==========================================================

const KNOWN_BOOKS = {
  22: { name: "Bang-e-Dra",              nameUrdu: 'بانگِ درا',    published: 1924, start: 1,   end: 200 },
  23: { name: "Zarb-e-Kalim",            nameUrdu: 'ضربِ کلیم',   published: 1936, start: 385, end: 597 },
  24: { name: "Gabriel's Wing",          nameUrdu: 'بالِ جبریل',  published: 1935, start: 201, end: 384 },
  31: { name: "Armughan-e-Hijaz (Urdu)", nameUrdu: 'ارمغانِ حجاز', published: 1938, start: 598, end: 642 },
}

///==========================================================
/// CLI ARGS
///
///   node scripts/scrape.js
///     → scrapes all known books
///
///   node scripts/scrape.js --book 24
///     → scrape Gabriel's Wing only
///
///   node scripts/scrape.js --book 24 --start 201 --end 220
///     → scrape orderNo 201 to 220
///
///   node scripts/scrape.js --book 24 --only 264
///     → scrape only orderNo 264
///
///   node scripts/scrape.js --book 24 --only 264,265,270
///     → scrape only those specific orderNos
///
///   node scripts/scrape.js --book 24 --start 201 --limit 10
///     → scrape first 10 poems starting at 201
///
///   node scripts/scrape.js --book 24 --delay 5000
///     → use 5 second delay between requests
///
///   node scripts/scrape.js --url "https://custom-url.com/poetry.php"
///     → use a custom base URL
///
///   node scripts/scrape.js --book 24 --orderfile ./data/logs/retry.txt
///     → scrape orderNos listed in a text file (one per line)
///==========================================================

const parseArgs = () => {
  const args = process.argv.slice(2)
  const parsed = {}

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2)
      parsed[key] = args[i + 1]
      i++
    }
  }

  return {
    book:      parsed.book      ? parseInt(parsed.book)  : null,
    start:     parsed.start     ? parseInt(parsed.start) : null,
    end:       parsed.end       ? parseInt(parsed.end)   : null,
    limit:     parsed.limit     ? parseInt(parsed.limit) : null,
    delay:     parsed.delay     ? parseInt(parsed.delay) : 3000,
    only:      parsed.only      ? parsed.only.split(',').map(n => parseInt(n.trim())) : null,
    url:       parsed.url       || null,
    orderfile: parsed.orderfile || null,
  }
}

///==========================================================
/// CONSTANTS
///==========================================================

const DEFAULT_BASE_URL = 'https://www.allamaiqbal.com/poetry.php'

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

const sleep     = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const ensureDir = (dir) => { if (!existsSync(dir)) mkdirSync(dir, { recursive: true }) }

///==========================================================
/// FILE PATHS — one source of truth per book
///
/// While in progress:  data/book_24.json
/// When complete:      data/book_24_complete.json
///==========================================================

const bookFilePath     = (bookbup) => `./data/book_${bookbup}.json`
const completeFilePath = (bookbup) => `./data/book_${bookbup}_complete.json`

///==========================================================
/// LOAD EXISTING DATA
/// Loads the current book file if it exists.
/// Returns a Map keyed by orderNo for fast upsert lookup.
///==========================================================

const loadExistingPoems = (bookbup) => {
  const path = bookFilePath(bookbup)

  // also check if complete file already exists
  const completePath = completeFilePath(bookbup)
  if (existsSync(completePath)) {
    console.log(`  ℹ Book ${bookbup} already marked complete. Loading from complete file.`)
    const raw = readFileSync(completePath, 'utf-8')
    const poems = JSON.parse(raw)
    return new Map(poems.map(p => [p.orderNo, p]))
  }

  if (!existsSync(path)) return new Map()

  const raw = readFileSync(path, 'utf-8')
  const poems = JSON.parse(raw)
  console.log(`  ℹ Loaded ${poems.length} existing poems from ${path}`)
  return new Map(poems.map(p => [p.orderNo, p]))
}

///==========================================================
/// SAVE AND CHECK COMPLETION
///
/// After every run, saves the merged dataset back to
/// data/book_{bookbup}.json
///
/// If the file now contains all orderNos in the book's range,
/// it is renamed to data/book_{bookbup}_complete.json
/// and any log retry files for this book are cleaned up.
///==========================================================

const saveAndCheckCompletion = (bookbup, bookInfo, poemMap) => {
  ensureDir('./data')

  const poems   = [...poemMap.values()].sort((a, b) => a.orderNo - b.orderNo)
  const json    = JSON.stringify(poems, null, 2)
  const total   = bookInfo.end - bookInfo.start + 1

  // count how many orderNos in the expected range are present and fully scraped
  let fullCount    = 0
  let partialCount = 0

  for (let orderNo = bookInfo.start; orderNo <= bookInfo.end; orderNo++) {
    const poem = poemMap.get(orderNo)
    if (!poem) continue
    const hasUrdu    = poem.urdu?.length > 0
    const hasEnglish = poem.english?.length > 0
    if (hasUrdu && hasEnglish) fullCount++
    else partialCount++
  }

  const presentCount = fullCount + partialCount
  const isComplete   = fullCount === total

  console.log(`\n  Book progress: ${presentCount}/${total} poems present  (${fullCount} full, ${partialCount} partial)`)

  if (isComplete) {
    // rename to complete
    const completePath = completeFilePath(bookbup)
    writeFileSync(completePath, json, 'utf-8')

    // delete in-progress file if it exists
    const inProgressPath = bookFilePath(bookbup)
    if (existsSync(inProgressPath)) unlinkSync(inProgressPath)

    console.log(`  🎉 Book complete! Saved → ${completePath}`)

    // clean up any retry txt files in logs for this book
    cleanupRetryFiles(bookbup)

  } else {
    const inProgressPath = bookFilePath(bookbup)
    writeFileSync(inProgressPath, json, 'utf-8')
    console.log(`  Saved → ${inProgressPath}  (${total - presentCount} poems still missing)`)
  }

  return { poems, isComplete, fullCount, partialCount, total }
}

const cleanupRetryFiles = (bookbup) => {
  const logsDir = './data/logs'
  if (!existsSync(logsDir)) return

  const files = readdirSync(logsDir)
  const retryFiles = files.filter(f => f.startsWith(`book_${bookbup}_`) && f.endsWith('_retry.txt'))

  for (const file of retryFiles) {
    unlinkSync(`${logsDir}/${file}`)
    console.log(`  Cleaned up → ${logsDir}/${file}`)
  }
}

///==========================================================
/// SCRAPE
///==========================================================

const scrapePoem = async (bookbup, orderNo, baseUrl) => {
  const params = `?bookbup=${bookbup}&orderno=${orderNo}&lang_code=en&lang=2`

  let urRes       = null
  let enRes       = null
  let urduError   = null
  let englishError = null

  try {
    urRes = await axios.get(baseUrl + params + '&conType=ur', { timeout: 10000, headers: HEADERS })
  } catch (err) {
    urduError = err.message
  }

  try {
    enRes = await axios.get(baseUrl + params + '&conType=en', { timeout: 10000, headers: HEADERS })
  } catch (err) {
    englishError = err.message
  }

  // replace <br> with \n before extracting text
  const ur$ = cheerio.load(urRes?.data ?? '')
  ur$('td[align="right"][dir="rtl"] br').replaceWith('\n')
  const urdu = urRes ? ur$('td[align="right"][dir="rtl"]').first().text().trim() : ''

  const en$ = cheerio.load(enRes?.data ?? '')
  en$('td[align="left"][dir="ltr"] br').replaceWith('\n')
  const english = enRes ? en$('td[align="left"][dir="ltr"]').first().text().trim() : ''

  const hasUrdu    = urdu.length > 0
  const hasEnglish = english.length > 0

  const fields = {
    urdu:    hasUrdu    ? 'ok' : (urduError    ? `fetch_error: ${urduError}`    : 'empty'),
    english: hasEnglish ? 'ok' : (englishError  ? `fetch_error: ${englishError}` : 'empty'),
  }

  if (!hasUrdu && !hasEnglish) {
    return { status: 'skipped', reason: 'both fields empty', fields }
  }

  return {
    status:  'success',
    orderNo,
    bookbup,
    urdu,
    english,
    fields,
    partial: !hasUrdu || !hasEnglish,
  }
}

const buildOrderNoList = (bookInfo, args) => {
  if (args.orderfile) {
    const contents = readFileSync(args.orderfile, 'utf-8')
    return contents.split('\n').map(l => parseInt(l.trim())).filter(n => !isNaN(n))
  }

  if (args.only) return args.only

  const start = args.start ?? bookInfo.start
  const end   = args.end   ?? bookInfo.end

  let range = []
  for (let i = start; i <= end; i++) range.push(i)

  if (args.limit) range = range.slice(0, args.limit)

  return range
}

const formatStatusLine = (poem) => {
  if (poem.status === 'skipped') return `skipped (${poem.reason})\n`
  if (poem.status === 'error')   return `✗ ${poem.reason}\n`

  const ur      = poem.fields.urdu    === 'ok' ? 'UR ✓' : 'UR ✗'
  const en      = poem.fields.english === 'ok' ? 'EN ✓' : 'EN ✗'
  const partial = poem.partial ? '  ← partial' : ''

  return `${ur}  ${en}${partial}\n`
}

///==========================================================
/// LOG WRITER
///==========================================================

const writeLog = (bookbup, bookName, summary) => {
  ensureDir('./data/logs')

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const logPath   = `./data/logs/book_${bookbup}_${timestamp}.json`

  const log = {
    book:      bookName,
    bookbup,
    timestamp: new Date().toISOString(),
    totals: {
      attempted:         summary.attempted,
      succeeded_full:    summary.succeededFull.length,
      succeeded_partial: summary.succeededPartial.length,
      skipped:           summary.skipped.length,
      failed:            summary.failed.length,
    },
    succeeded_full:    summary.succeededFull,
    succeeded_partial: summary.succeededPartial.map(p => ({
      orderNo: p.orderNo,
      urdu:    p.fields.urdu,
      english: p.fields.english,
    })),
    skipped: summary.skipped,
    failed:  summary.failed.map(p => ({ orderNo: p.orderNo, reason: p.reason })),
  }

  writeFileSync(logPath, JSON.stringify(log, null, 2), 'utf-8')
  console.log(`  Log      → ${logPath}`)

  // retry file: failed + partial (missing one field)
  const toRetry = [
    ...summary.failed.map(p => p.orderNo),
    ...summary.succeededPartial.map(p => p.orderNo),
    ...summary.skipped,
  ]

  if (toRetry.length > 0) {
    const retryPath = `./data/logs/book_${bookbup}_${timestamp}_retry.txt`
    writeFileSync(retryPath, toRetry.join('\n'), 'utf-8')
    console.log(`  Retry    → ${retryPath}`)
    console.log(`  Command  → node scripts/scrape.js --book ${bookbup} --orderfile ${retryPath}`)
  }
}

///==========================================================
/// SCRAPE ONE BOOK
///==========================================================

const scrapeBook = async (bookbup, bookInfo, args) => {
  const baseUrl  = args.url ?? DEFAULT_BASE_URL
  const orderNos = buildOrderNoList(bookInfo, args)
  const total    = orderNos.length

  console.log(`\nBook:  ${bookInfo.name} (bookbup=${bookbup})`)
  console.log(`Poems: ${total} to scrape this run (orderNo ${orderNos[0]} → ${orderNos[total - 1]})`)
  console.log(`URL:   ${baseUrl}`)
  console.log(`Delay: ${args.delay}ms between requests`)
  console.log('─'.repeat(55))

  // load existing data so we can upsert into it
  const poemMap = loadExistingPoems(bookbup)

  const summary = {
    attempted:        total,
    succeededFull:    [],
    succeededPartial: [],
    skipped:          [],
    failed:           [],
  }

  for (let i = 0; i < orderNos.length; i++) {
    const orderNo = orderNos[i]
    process.stdout.write(`  [${i + 1}/${total}] orderNo ${orderNo}... `)

    const poem = await scrapePoem(bookbup, orderNo, baseUrl)
    process.stdout.write(formatStatusLine(poem))

    if (poem.status === 'success') {
      // upsert — overwrite existing entry for this orderNo
      poemMap.set(orderNo, {
        orderNo:       poem.orderNo,
        bookbup:       bookbup,
        bookName:      bookInfo.name,
        bookNameUrdu:  bookInfo.nameUrdu,
        bookPublished: bookInfo.published,
        urdu:          poem.urdu,
        english:       poem.english,
      })

      if (poem.partial) {
        summary.succeededPartial.push(poem)
      } else {
        summary.succeededFull.push(orderNo)
      }

    } else if (poem.status === 'skipped') {
      summary.skipped.push(orderNo)
    } else {
      summary.failed.push({ orderNo, reason: poem.reason })
    }

    if (i < orderNos.length - 1) await sleep(args.delay)
  }

  // run summary
  console.log('─'.repeat(55))
  console.log(`  ✓ Full:    ${summary.succeededFull.length}`)
  console.log(`  ~ Partial: ${summary.succeededPartial.length}`)
  console.log(`  ⊘ Skipped: ${summary.skipped.length}`)
  console.log(`  ✗ Failed:  ${summary.failed.length}`)

  writeLog(bookbup, bookInfo.name, summary)

  // save merged dataset and check if book is now complete
  const saved = saveAndCheckCompletion(bookbup, bookInfo, poemMap)

  return saved.poems
}

///==========================================================
/// MAIN
///==========================================================

const main = async () => {
  const args = parseArgs()

  console.log('IqbalAPI Scraper')
  console.log('================')

  let booksToScrape

  if (args.book) {
    const bookInfo = KNOWN_BOOKS[args.book]
    if (!bookInfo) {
      console.error(`✗ Unknown book ID: ${args.book}`)
      console.error(`  Known IDs: ${Object.keys(KNOWN_BOOKS).join(', ')}`)
      process.exit(1)
    }
    booksToScrape = [[args.book, bookInfo]]
  } else {
    booksToScrape = Object.entries(KNOWN_BOOKS).map(([id, info]) => [parseInt(id), info])
  }

  const allResults = []

  for (const [bookbup, bookInfo] of booksToScrape) {
    const results = await scrapeBook(bookbup, bookInfo, args)
    allResults.push(...results)
  }

  // combined file only written when scraping multiple books
  if (booksToScrape.length > 1) {
    ensureDir('./data')
    writeFileSync('./data/iqbal_poems.json', JSON.stringify(allResults, null, 2), 'utf-8')
    console.log(`\n✓ Combined → data/iqbal_poems.json`)
  }

  console.log('\n================')
  console.log(`✓ Done. ${allResults.length} total poems in dataset.`)
}

main()