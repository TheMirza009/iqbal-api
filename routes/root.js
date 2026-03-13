import { Router } from "express";

const router = Router()

///==========================================================
/// ROOT METHODS
///==========================================================

// Returns a welcome / intro
// Query param: none
router.get('/', (request, response) => {
    response.json({
    name: 'IqbalAPI',
    version: '1.0.0',
    description: 'A REST API for Allama Iqbal\'s poetry',
    endpoints: {
      books: '/books',
      poems: '/poems',
      verses: '/verses'
    }
  })
});

export default router;