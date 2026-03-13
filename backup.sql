--
-- PostgreSQL database dump
--

\restrict rfI6TYQFEfTico8tul5ZDWNAkhhWCIYObwJeqs0OvuPjwbJbr6k7aAwSp0lUjd2

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    id integer NOT NULL,
    name character varying(255),
    name_urdu character varying(255),
    book_id integer,
    published integer
);


ALTER TABLE public.books OWNER TO postgres;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.books_id_seq OWNER TO postgres;

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: poems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.poems (
    id integer NOT NULL,
    book_id integer,
    poem_no integer,
    name character varying(255),
    name_urdu character varying(255)
);


ALTER TABLE public.poems OWNER TO postgres;

--
-- Name: poems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.poems_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.poems_id_seq OWNER TO postgres;

--
-- Name: poems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.poems_id_seq OWNED BY public.poems.id;


--
-- Name: verses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.verses (
    id integer NOT NULL,
    book_id integer,
    poem_id integer,
    verse_no integer,
    urdu text,
    english text
);


ALTER TABLE public.verses OWNER TO postgres;

--
-- Name: verses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.verses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.verses_id_seq OWNER TO postgres;

--
-- Name: verses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.verses_id_seq OWNED BY public.verses.id;


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Name: poems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poems ALTER COLUMN id SET DEFAULT nextval('public.poems_id_seq'::regclass);


--
-- Name: verses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verses ALTER COLUMN id SET DEFAULT nextval('public.verses_id_seq'::regclass);


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books (id, name, name_urdu, book_id, published) FROM stdin;
1	Gabriel's Wing	بالِ جبریل	24	1935
\.


--
-- Data for Name: poems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.poems (id, book_id, poem_no, name, name_urdu) FROM stdin;
1	1	264	What should I ask the sages about my origin	خِردمندوں سے کیا پُوچھوں
\.


--
-- Data for Name: verses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.verses (id, book_id, poem_id, verse_no, urdu, english) FROM stdin;
2	1	1	2	خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے\nخدا بندے سے خود پُوچھے، بتا تیری رضا کیا ہے	Develop the self so that before every decree\nGod will ascertain from you: What is your wish?
3	1	1	3	مقامِ گُفتگو کیا ہے اگر مَیں کیمیاگر ہوں\nیہی سوزِ نفَس ہے، اَور میری کیمیا کیا ہے	It is nothing to talk about if I transform base selves into gold:\nThe passion of my voice is the only alchemy I know!
4	1	1	4	نظر آئیں مجھے تقدیر کی گہرائیاں اُس میں\nنہ پُوچھ اے ہم نشیں مجھ سے وہ چشمِ سُرمہ سا کیا ہے	O Comrade, I beheld the secrets of Destiny in them—\nWhat should I tell you of those lustrous eyes!
5	1	1	5	اگر ہوتا وہ مجذوبِ* فرنگی اس زمانے میں\nتو اقبالؔ اس کو سمجھاتا مقامِ کبریا کیا ہے	O Comrade, I beheld the secrets of Destiny in them—\nWhat should I tell you of those lustrous eyes!
1	1	1	1	خِردمندوں سے کیا پُوچھوں کہ میری ابتدا کیا ہے\nکہ مَیں اس فکر میں رہتا ہوں، میری انتہا کیا ہے	What should I ask the sages about my origin:\nI am always wanting to know my goal.
\.


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_id_seq', 1, true);


--
-- Name: poems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.poems_id_seq', 3, true);


--
-- Name: verses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.verses_id_seq', 5, true);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: poems poems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poems
    ADD CONSTRAINT poems_pkey PRIMARY KEY (id);


--
-- Name: verses verses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verses
    ADD CONSTRAINT verses_pkey PRIMARY KEY (id);


--
-- Name: poems poems_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poems
    ADD CONSTRAINT poems_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- Name: verses verses_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verses
    ADD CONSTRAINT verses_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- Name: verses verses_poem_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verses
    ADD CONSTRAINT verses_poem_id_fkey FOREIGN KEY (poem_id) REFERENCES public.poems(id);


--
-- PostgreSQL database dump complete
--

\unrestrict rfI6TYQFEfTico8tul5ZDWNAkhhWCIYObwJeqs0OvuPjwbJbr6k7aAwSp0lUjd2

