import { useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import { useColorMode } from '@docusaurus/theme-common';

const BOOKS = [
  { en: 'Bang-e-Dra', ur: 'بانگِ درا', year: 1924, desc: 'The Call of the Bell — Iqbal\'s first Urdu collection, spanning his early nationalist and philosophical poems.' },
  { en: "Gabriel's Wing", ur: 'بالِ جبریل', year: 1935, desc: 'His most celebrated work, containing the iconic Shikwa and Jawab-e-Shikwa along with devotional verse.' },
  { en: 'Zarb-e-Kalim', ur: 'ضربِ کلیم', year: 1936, desc: 'The Rod of Moses — a sharp critique of Western civilization and a call to spiritual awakening.' },
  { en: 'Armughan-e-Hijaz', ur: 'ارمغانِ حجاز', year: 1938, desc: 'Gift of the Hijaz — his final collection, published posthumously in the year of his death.' },
];

const FEATURES = [
  { icon: '🔍', title: 'Full-Text Search', desc: 'Search across Urdu text, English translations, poem names, and book titles in a single query.' },
  { icon: '🔀', title: 'Random Endpoints', desc: 'Get a random couplet, poem, or book instantly — perfect for quote widgets and daily verse apps.' },
  { icon: '📄', title: 'Pagination', desc: 'Control exactly how much data you receive with count and page parameters on every collection.' },
  { icon: '🌐', title: 'CORS Enabled', desc: 'Call it freely from any browser, Flutter app, mobile client, or server-side application.' },
  { icon: '⚡', title: 'PostgreSQL Backed', desc: 'Trigram indexes enable fast full-text search across thousands of verses in both Urdu and English.' },
  { icon: '🔓', title: 'No Auth Required', desc: 'Completely open. No API key, no sign up, no rate limit for reasonable usage. Just HTTP.' },
];

const ENDPOINTS = [
  { method: 'GET', path: '/verses/random', desc: 'Random couplet' },
  { method: 'GET', path: '/poems/random', desc: 'Random poem with verses' },
  { method: 'GET', path: '/books', desc: 'All 4 books' },
  { method: 'GET', path: '/search?term=خودی', desc: 'Search by term' },
  { method: 'GET', path: '/verses?count=10&page=2', desc: 'Paginated verses' },
];

export default function Home() {
  useEffect(() => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    const scrollY = window.scrollY;
    const navHeight = navbar.offsetHeight;
    const isMobile = window.innerWidth <= 600;

    // On mobile, trigger as soon as we scroll past the nav's own height
    // On desktop, keep your existing Hero-based logic
    const triggerPoint = isMobile ? navHeight : 64;

    if (scrollY > triggerPoint) {
      navbar.classList.add('navbar--scrolled');
      navbar.classList.remove('navbar--over-hero');
    } else {
      navbar.classList.add('navbar--over-hero');
      navbar.classList.remove('navbar--scrolled');
    }
  };

  navbar.classList.add('navbar--over-hero');
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => {
    window.removeEventListener('scroll', onScroll);
    navbar.classList.remove('navbar--over-hero', 'navbar--scrolled');
  };
}, []);

  return (
    <Layout
      title="IqbalAPI"
      description="A free, open REST API for Allama Iqbal's poetry."
    >
      <div className={styles.page}>
        {/* ── HERO ── */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.logoWrapper}>
              <img
                src="/img/logo.svg"
                alt="IqbalAPI Logo"
                className={styles.heroLogo}
              />
            </div>
            <span className={styles.badge}>Free &amp; Open Source</span>
            <h1 className={styles.heroTitle}>IqbalAPI</h1>
            <p className={styles.heroUrdu}>ستاروں سے آگے جہاں اوربھی ہیں</p>
            <p className={styles.tagline}>
              A free, structured REST API for the complete Urdu poetry of{" "}
              <strong>Allama Iqbal</strong> — with English translations,
              full-text search, and pagination.
            </p>
            <div className={styles.ctas}>
              <Link className={styles.btnPrimary} to="/docs/intro">
                Read the Docs
              </Link>
              <Link className={styles.btnOutline} to="/playground">
                Try Playground
              </Link>
              <a
                className={styles.btnOutline}
                href="https://iqbal-api.up.railway.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live API ↗
              </a>
              <a
                className={styles.btnGhost}
                href="https://github.com/TheMirza009/iqbal-api"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className={styles.divider} />

        {/* ── BOOKS ── */}
        <section className={`${styles.section} ${styles.sectionIndented}`}>
          <div className={styles.container}>
            <p className={styles.label}>The Collection</p>
            <h2 className={styles.sectionTitle}>
              Four Books of Iqbal's Poetry
            </h2>
            <div className={styles.bookGrid}>
              {BOOKS.map((b, i) => (
                <div key={i} className={styles.bookCard}>
                  <div className={styles.bookYear}>{b.year}</div>
                  <h3 className={styles.bookEn}>{b.en}</h3>
                  <p className={styles.bookUr}>{b.ur}</p>
                  <p className={styles.bookDesc}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENDPOINTS ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.container}>
            <p className={styles.label}>Quick Reference</p>
            <h2 className={styles.sectionTitle}>
              Simple, Predictable Endpoints
            </h2>
            <p className={styles.sectionSubtitle}>
              Click any endpoint to try it live against the API
            </p>
            <div className={styles.endpointList}>
              {ENDPOINTS.map((e, i) => (
                <a
                  key={i}
                  className={styles.endpointRow}
                  href={`https://iqbal-api.up.railway.app${e.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.method}>{e.method}</span>
                  <code className={styles.path}>{e.path}</code>
                  <span className={styles.edesc}>{e.desc}</span>
                  <span className={styles.earrow}>↗</span>
                </a>
              ))}
            </div>
          <div className={styles.endpointTeaser}>
            <span className={styles.teaserText}>
              Want to explore interactively?
            </span>
            <Link className={styles.teaserLink} to="/playground">
              Open the Playground →
            </Link>
          </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className={styles.section}>
          <div className={styles.container}>
            <p className={styles.label}>What's Included</p>
            <h2 className={styles.sectionTitle}>Everything You Need</h2>
            <div className={styles.featureGrid}>
              {FEATURES.map((f, i) => (
                <div key={i} className={styles.featureCard}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXAMPLE ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.container}>
            <p className={styles.label}>Example Response</p>
            <h2 className={styles.sectionTitle}>GET /verses/random</h2>
            <ExampleBlock />
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={`${styles.section} ${styles.ctaSection}`}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>Start Building</h2>
            <p className={styles.ctaSub}>No API key. No sign up. Just HTTP.</p>
            <Link className={styles.btnPrimary} to="/docs/intro">
              Read the Documentation →
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

function ExampleBlock() {
  const { colorMode } = useColorMode();
  return (
    <div className={styles.codeBlock} style={colorMode === 'light' ? { background: '#faf8f4' } : {}}>
      <pre>{`[
  {
    "id": 5707,
    "verse_no": 2,
    "urdu": "خودی کا سرِ نہاں لا الہ الا اللہ",
    "english": "The secret of the self is hidden in the words: there is no god but God"
  },
  {
    "id": 5708,
    "verse_no": 3,
    "urdu": "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے",
    "english": "Develop the self so that before every decree"
  }
]`}</pre>
    </div>
  );
}