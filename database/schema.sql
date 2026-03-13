--
-- PostgreSQL database dump
--

\restrict ykEv7dX5aD20cQ8kryq7Q29deJCivDwRkc3XHcjeo875WK5E7nK9ZKfgnpy1TFM

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
-- Name: books; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.books (
    id integer NOT NULL,
    name character varying(255),
    name_urdu character varying(255),
    book_id integer,
    published integer
);


--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: poems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.poems (
    id integer NOT NULL,
    book_id integer,
    poem_no integer,
    name character varying(255),
    name_urdu character varying(255)
);


--
-- Name: poems_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.poems_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: poems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.poems_id_seq OWNED BY public.poems.id;


--
-- Name: verses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.verses (
    id integer NOT NULL,
    book_id integer,
    poem_id integer,
    verse_no integer,
    urdu text,
    english text
);


--
-- Name: verses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.verses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: verses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.verses_id_seq OWNED BY public.verses.id;


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Name: poems id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.poems ALTER COLUMN id SET DEFAULT nextval('public.poems_id_seq'::regclass);


--
-- Name: verses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verses ALTER COLUMN id SET DEFAULT nextval('public.verses_id_seq'::regclass);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: poems poems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.poems
    ADD CONSTRAINT poems_pkey PRIMARY KEY (id);


--
-- Name: verses verses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verses
    ADD CONSTRAINT verses_pkey PRIMARY KEY (id);


--
-- Name: poems poems_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.poems
    ADD CONSTRAINT poems_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- Name: verses verses_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verses
    ADD CONSTRAINT verses_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- Name: verses verses_poem_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verses
    ADD CONSTRAINT verses_poem_id_fkey FOREIGN KEY (poem_id) REFERENCES public.poems(id);


--
-- PostgreSQL database dump complete
--

\unrestrict ykEv7dX5aD20cQ8kryq7Q29deJCivDwRkc3XHcjeo875WK5E7nK9ZKfgnpy1TFM

