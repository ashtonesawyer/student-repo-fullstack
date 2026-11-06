var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const resp = await fetch('https://rickandmortyapi.com/api/character');
    const page1 = await resp.json();

    const elemCnt = page1.info.count;
    const restResp = await fetch(
      `https://rickandmortyapi.com/api/character/${Array.from({ length: elemCnt }, (_, i) => i + 21).join(',')}`,
    );
    const rest = await restResp.json();

    const results = [...page1.results, ...rest];
    const unsortedSpecies = Object.groupBy(results, (obj) =>
      obj.species ? obj.species : 'unknown',
    );
    const species = Object.fromEntries(
      Object.entries(unsortedSpecies).sort((a, b) => a[1].length - b[1].length),
    );

    res.render('species', { species: species });
  } catch (err) {
    console.log(err);
    res.render('error');
  }
});

module.exports = router;
