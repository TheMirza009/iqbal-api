import { Router } from "express";

const router = Router();

///==========================================================
/// ROOT METHODS
///==========================================================

// Returns a welcome / intro
// Query param: none
router.get("/", (request, response) => {
  response.json({
    name: "IqbalAPI",
    version: "1.0.0",
    description: "A REST API for Allama Iqbal's poetry",
    author: 'Mirza AbdulMoeed',
    github: 'https://github.com/TheMirza009/iqbal-api',
    endpoints: {
      books: "/books",
      poems: "/poems",
      verses: "/verses",
      search: "/search?term=<SEARCH TERM>",
      random: {
        book: "/books/random",
        poem: "/poems/random",
        verse: "/verses/random",
      },
    },
  });
});

export default router;
