import { useState, useCallback } from 'react';
import Layout from '@theme/Layout';
import styles from './playground.module.css';

const API = 'https://iqbal-api.up.railway.app';

// ── Verse Card ─────────────────────────────────────────────────────────────
function VerseCard({ verse, meta }) {
  return (
    <div className={styles.verseCard}>
      {meta && (
        <div className={styles.verseMeta}>
          {meta.bookName && <span className={styles.metaBook}>{meta.bookName}</span>}
          {meta.poemName && <span className={styles.metaPoem}>{meta.poemName}</span>}
          {meta.poemNo !== undefined && (
            <span className={styles.metaNo}>Poem #{meta.poemNo}</span>
          )}
          {verse.verse_no !== undefined && (
            <span className={styles.metaVerse}>Verse {verse.verse_no}</span>
          )}
        </div>
      )}
      <p className={styles.verseUrdu} dir="rtl">{verse.urdu}</p>
      <p className={styles.verseEnglish}>{verse.english}</p>
    </div>
  );
}

// ── Poem Card ──────────────────────────────────────────────────────────────
function PoemCard({ poem, bookName }) {
  const [expanded, setExpanded] = useState(false);
  const [verses, setVerses] = useState(poem.verses || null);
  const [loading, setLoading] = useState(false);

  const loadVerses = async () => {
    if (expanded) { setExpanded(false); return; }
    if (verses) { setExpanded(true); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/poems/${poem.id}`);
      const data = await res.json();
      setVerses(data.verses);
      setExpanded(true);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className={styles.poemCard}>
      <div className={styles.poemHeader} onClick={loadVerses}>
        <div className={styles.poemInfo}>
          <div className={styles.poemMeta}>
            {bookName && <span className={styles.metaBook}>{bookName}</span>}
            <span className={styles.metaNo}>Poem #{poem.poem_no}</span>
          </div>
          <h3 className={styles.poemTitle}>{poem.name}</h3>
          <p className={styles.poemUrduTitle} dir="rtl">{poem.name_urdu}</p>
        </div>
        <button className={styles.expandBtn}>
          {loading ? '···' : expanded ? '↑' : '↓'}
        </button>
      </div>

      {expanded && verses && (
        <div className={styles.verseList}>
          {verses.map((v) => (
            <div key={v.id} className={styles.verseRow}>
              <span className={styles.verseNum}>{v.verse_no}</span>
              <div className={styles.verseTexts}>
                <p className={styles.verseUrdu} dir="rtl">{v.urdu}</p>
                <p className={styles.verseEnglish}>{v.english}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Book Card ──────────────────────────────────────────────────────────────
function BookCard({ book, onBrowse }) {
  return (
    <div className={styles.bookCard}>
      <div className={styles.bookYear}>{book.published}</div>
      <h3 className={styles.bookTitle}>{book.name}</h3>
      <p className={styles.bookUrdu} dir="rtl">{book.name_urdu}</p>
      <button className={styles.browseBtn} onClick={() => onBrowse(book)}>
        Browse Poems →
      </button>
    </div>
  );
}

// ── Main Playground ────────────────────────────────────────────────────────
export default function Playground() {
  const [tab, setTab] = useState('search');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Books tab
  const [books, setBooks] = useState(null);
  const [booksLoading, setBooksLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookPoems, setBookPoems] = useState(null);
  const [bookPoemsLoading, setBookPoemsLoading] = useState(false);
  const [bookPage, setBookPage] = useState(1);
  const [bookTotal, setBookTotal] = useState(0);
  const POEMS_PER_PAGE = 10;

  // Random tab
  const [random, setRandom] = useState(null);
  const [randomLoading, setRandomLoading] = useState(false);

  // ── Search ───────────────────────────────────────────────────────────────
  const search = useCallback(async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch(`${API}/search?term=${encodeURIComponent(query)}&count=20&page=1`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResults(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
    setLoading(false);
  }, [query]);

  // ── Load Books ───────────────────────────────────────────────────────────
  const loadBooks = useCallback(async () => {
    if (books) return;
    setBooksLoading(true);
    try {
      const res = await fetch(`${API}/books`);
      const data = await res.json();
      setBooks(data);
    } catch (e) { console.error(e); }
    setBooksLoading(false);
  }, [books]);

  const browseBook = useCallback(async (book, page = 1) => {
    setSelectedBook(book);
    setBookPoemsLoading(true);
    setBookPoems(null);
    setBookPage(page);
    try {
      const res = await fetch(`${API}/poems?count=${POEMS_PER_PAGE}&page=${page}`);
      const data = await res.json();
      // Filter by book_id
      const filtered = (data.poems || data).filter(p => p.book_id === book.id);
      // Get total for this book via complete book
      if (page === 1) {
        const bookRes = await fetch(`${API}/books/${book.id}`);
        const bookData = await bookRes.json();
        setBookTotal(bookData.poems?.length || 0);
        setBookPoems(bookData.poems || []);
      } else {
        setBookPoems(filtered);
      }
    } catch (e) { console.error(e); }
    setBookPoemsLoading(false);
  }, []);

  // ── Random Verse ─────────────────────────────────────────────────────────
  const loadRandom = useCallback(async () => {
    setRandomLoading(true);
    setRandom(null);
    try {
      const res = await fetch(`${API}/verses/random`);
      const data = await res.json();
      setRandom(data);
    } catch (e) { console.error(e); }
    setRandomLoading(false);
  }, []);

  // ── Tab change ───────────────────────────────────────────────────────────
  const switchTab = (t) => {
    setTab(t);
    if (t === 'books') loadBooks();
    if (t === 'random') loadRandom();
  };

  return (
    <Layout title="Playground — IqbalAPI" description="Live interactive explorer for IqbalAPI">
      <div className={styles.page}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <h1 className={styles.title}>API Playground</h1>
          <p className={styles.subtitle}>
            Explore Allama Iqbal's poetry live — powered by{' '}
            <a href="https://iqbal-api.up.railway.app" target="_blank" rel="noopener noreferrer">
              IqbalAPI
            </a>
          </p>
          <div className={styles.baseUrl}>
            <span className={styles.baseUrlLabel}>BASE URL</span>
            <code className={styles.baseUrlCode}>https://iqbal-api.up.railway.app</code>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className={styles.tabs}>
          {[
            { id: 'search', label: 'Search', endpoint: '/search?term=...' },
            { id: 'books', label: 'Browse Books', endpoint: '/books' },
            { id: 'random', label: 'Random Verse', endpoint: '/verses/random' },
          ].map((t) => (
            <button
              key={t.id}
              className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
              onClick={() => switchTab(t.id)}
            >
              <span className={styles.tabLabel}>{t.label}</span>
              <code className={styles.tabEndpoint}>{t.endpoint}</code>
            </button>
          ))}
        </div>

        <div className={styles.content}>

          {/* ══ SEARCH TAB ══ */}
          {tab === 'search' && (
            <div className={styles.tabContent}>
              <form onSubmit={search} className={styles.searchForm}>
                <div className={styles.searchRow}>
                  <input
                    className={styles.searchInput}
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search in English or Urdu — e.g. khudi or خودی"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className={styles.searchBtn}
                    disabled={loading || !query.trim()}
                  >
                    {loading ? '···' : 'Search'}
                  </button>
                </div>
                <p className={styles.searchHint}>
                  Searches across verses, poem titles, and book names in both languages
                </p>
              </form>

              {error && (
                <div className={styles.error}>
                  <span className={styles.errorIcon}>!</span> {error}
                </div>
              )}

              {results && (
                <>
                  {/* Meta */}
                  <div className={styles.resultsMeta}>
                    <div className={styles.metaStat}>
                      <span className={styles.metaStatNum}>{results.total}</span>
                      <span className={styles.metaStatLabel}>total matches</span>
                    </div>
                    <div className={styles.metaStat}>
                      <span className={styles.metaStatNum}>{results.meta?.books}</span>
                      <span className={styles.metaStatLabel}>books</span>
                    </div>
                    <div className={styles.metaStat}>
                      <span className={styles.metaStatNum}>{results.meta?.poems}</span>
                      <span className={styles.metaStatLabel}>poems</span>
                    </div>
                    <div className={styles.metaStat}>
                      <span className={styles.metaStatNum}>{results.meta?.verses}</span>
                      <span className={styles.metaStatLabel}>verses</span>
                    </div>
                  </div>

                  {/* Book matches */}
                  {results.books?.length > 0 && (
                    <div className={styles.section}>
                      <h2 className={styles.sectionTitle}>
                        <code className={styles.sectionEndpoint}>books</code>
                        <span className={styles.sectionCount}>{results.books.length}</span>
                      </h2>
                      <div className={styles.bookGrid}>
                        {results.books.map(b => (
                          <BookCard key={b.id} book={b} onBrowse={(book) => {
                            switchTab('books');
                            browseBook(book);
                          }} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Poem matches */}
                  {results.poems?.length > 0 && (
                    <div className={styles.section}>
                      <h2 className={styles.sectionTitle}>
                        <code className={styles.sectionEndpoint}>poems</code>
                        <span className={styles.sectionCount}>{results.poems.length}</span>
                      </h2>
                      <div className={styles.poemGrid}>
                        {results.poems.map(p => {
                          const book = results.books?.find(b => b.id === p.book_id);
                          return (
                            <PoemCard key={p.id} poem={p} bookName={book?.name} />
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Verse matches */}
                  {results.verses?.length > 0 && (
                    <div className={styles.section}>
                      <h2 className={styles.sectionTitle}>
                        <code className={styles.sectionEndpoint}>verses</code>
                        <span className={styles.sectionCount}>{results.verses.length}</span>
                      </h2>
                      <div className={styles.verseGrid}>
                        {results.verses.map(v => {
                          const poem = results.poems?.find(p => p.id === v.poem_id);
                          const book = results.books?.find(b => b.id === v.book_id);
                          return (
                            <VerseCard
                              key={v.id}
                              verse={v}
                              meta={{
                                bookName: book?.name,
                                poemName: poem?.name,
                                poemNo: poem?.poem_no,
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {results.total === 0 && (
                    <div className={styles.empty}>No results found for "{query}"</div>
                  )}
                </>
              )}

              {!results && !loading && !error && (
                <div className={styles.searchPrompt}>
                  <p>Try searching for <button className={styles.suggestion} onClick={() => { setQuery('khudi'); }}>khudi</button>, <button className={styles.suggestion} onClick={() => { setQuery('eagle'); }}>eagle</button>, or <button className={styles.suggestion} onClick={() => { setQuery('خودی'); }}>خودی</button></p>
                </div>
              )}
            </div>
          )}

          {/* ══ BOOKS TAB ══ */}
          {tab === 'books' && (
            <div className={styles.tabContent}>
              {booksLoading && <div className={styles.loading}>Loading books···</div>}

              {!selectedBook && books && (
                <>
                  <p className={styles.browseHint}>Select a book to browse its poems and verses</p>
                  <div className={styles.bookGrid}>
                    {books.map(b => (
                      <BookCard key={b.id} book={b} onBrowse={browseBook} />
                    ))}
                  </div>
                </>
              )}

              {selectedBook && (
                <>
                  <div className={styles.bookBreadcrumb}>
                    <button className={styles.backBtn} onClick={() => { setSelectedBook(null); setBookPoems(null); }}>
                      ← All Books
                    </button>
                    <span className={styles.breadcrumbSep}>/</span>
                    <span className={styles.breadcrumbCurrent}>{selectedBook.name}</span>
                    <span className={styles.breadcrumbUrdu} dir="rtl">{selectedBook.name_urdu}</span>
                    {bookTotal > 0 && <span className={styles.breadcrumbCount}>{bookTotal} poems</span>}
                  </div>

                  {bookPoemsLoading && <div className={styles.loading}>Loading poems···</div>}

                  {bookPoems && (
                    <div className={styles.poemGrid}>
                      {bookPoems.map(p => (
                        <PoemCard key={p.id} poem={p} bookName={selectedBook.name} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ══ RANDOM TAB ══ */}
          {tab === 'random' && (
            <div className={styles.tabContent}>
              <div className={styles.randomHeader}>
                <p className={styles.randomHint}>
                  Returns a random couplet — two verses that belong together
                </p>
                <button
                  className={styles.randomBtn}
                  onClick={loadRandom}
                  disabled={randomLoading}
                >
                  {randomLoading ? '···' : '↺ New Couplet'}
                </button>
              </div>

              {randomLoading && <div className={styles.loading}>Loading···</div>}

              {random && (
                <div className={styles.coupletCard}>
                  <div className={styles.coupletLabel}>
                    <code>/verses/random</code>
                  </div>
                  {random.map((v, i) => (
                    <div key={v.id} className={styles.coupletVerse}>
                      <span className={styles.coupletNum}>{v.verse_no}</span>
                      <div className={styles.coupletTexts}>
                        <p className={styles.verseUrdu} dir="rtl">{v.urdu}</p>
                        <p className={styles.verseEnglish}>{v.english}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!random && !randomLoading && (
                <div className={styles.searchPrompt}>
                  <p>Click the button above to load a random couplet</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}