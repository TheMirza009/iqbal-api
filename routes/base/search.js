import { Router } from "express";
import pool from "../../database/index.js";

const router = Router();

router.get("/", async (request, response) => {
  const { count, page, term } = request.query;

  // Validate term
  if (!term || !term.trim()) {
    return response.status(400).json({ error: "Search term is required" });
  }

  try {
    const terms = term.trim().split(/\s+/).map((w) => `%${w}%`);

    const termConditions = terms
      .map(
        (_, i) => `
        (verses.english    ILIKE $${i + 1}
      OR verses.urdu       ILIKE $${i + 1}
      OR poems.name        ILIKE $${i + 1}
      OR poems.name_urdu   ILIKE $${i + 1}
      OR books.name        ILIKE $${i + 1}
      OR books.name_urdu   ILIKE $${i + 1})`,
      )
      .join(" AND ");

    const baseQuery = `
      SELECT 
          verses.id as verse_id,
          verses.verse_no,
          verses.urdu,
          verses.english,
          poems.id as poem_id,
          poems.name as poem_name,
          poems.name_urdu as poem_name_urdu,
          books.id as book_id,
          books.name as book_name,
          books.name_urdu as book_name_urdu
      FROM verses
      JOIN poems ON verses.poem_id = poems.id
      JOIN books ON verses.book_id = books.id
      WHERE ${termConditions}
      ORDER BY verses.id ASC
    `;

    // Single query execution — paginated or full
    let result;
    if (count && page) {
      const offset = (parseInt(page) - 1) * parseInt(count);
      result = await pool.query(
        `${baseQuery} LIMIT $${terms.length + 1} OFFSET $${terms.length + 2}`,
        [...terms, count, offset],
      );
    } else if (count) {
      result = await pool.query(
        `${baseQuery} LIMIT $${terms.length + 1}`,
        [...terms, count],
      );
    } else {
      result = await pool.query(baseQuery, terms);
    }

    if (result.rows.length === 0) {
      return response.status(404).json({ error: "No results found" });
    }

    const books = [
      ...new Map(
        result.rows.map((row) => [
          row.book_id,
          { id: row.book_id, name: row.book_name, name_urdu: row.book_name_urdu },
        ]),
      ).values(),
    ];

    const poems = [
      ...new Map(
        result.rows.map((row) => [
          row.poem_id,
          { id: row.poem_id, name: row.poem_name, name_urdu: row.poem_name_urdu },
        ]),
      ).values(),
    ];

    const words = term.trim().toLowerCase().split(/\s+/);
    const verses = result.rows
      .filter((row) =>
        words.every(
          (w) => row.english?.toLowerCase().includes(w) || row.urdu?.includes(w),
        ),
      )
      .map((row) => ({
        id: row.verse_id,
        verse_no: row.verse_no,
        urdu: row.urdu,
        english: row.english,
      }));

    const totalResult = await pool.query(
      `SELECT COUNT(*) FROM verses
       JOIN poems ON verses.poem_id = poems.id
       JOIN books ON verses.book_id = books.id
       WHERE ${termConditions}`,
      terms,
    );

    const total = parseInt(totalResult.rows[0].count);
    const meta = {
      books: books.length,
      poems: poems.length,
      verses: verses.length,
    };

    // Single book match — return just the book
    if (books.length === 1 && verses.length === 0) {
      return response.json({ total, meta, books, poems, verses });
    }

    // Single poem match — return poem with its first verse
    if (poems.length === 1 && verses.length === 0) {
      const firstVerse = await pool.query(
        `SELECT * FROM verses WHERE poem_id = $1 ORDER BY verse_no ASC LIMIT 1`,
        [poems[0].id],
      );
      return response.json({ total, meta, books, poems, verses: firstVerse.rows });
    }

    if (count && page) {
      return response.json({
        page: parseInt(page),
        count: parseInt(count),
        total,
        meta,
        books,
        poems,
        verses,
      });
    }

    response.json({ total, meta, books, poems, verses });

  } catch (error) {
    console.error("Search error:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

export default router;