var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const resp = await fetch(
      `https://rickandmortyapi.com/api/character/${Array.from({ length: 100 }, (_, i) => i + 1).join(',')}`,
    );
    const characters = await resp.json();

    res.render('characters', { characters: characters });
  } catch {
    res.render('error');
  }
});

module.exports = router;
