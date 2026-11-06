var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const resp = await fetch('https://rickandmortyapi.com/api/location');
    const page1 = await resp.json();

    const elemCnt = page1.info.count;
    const restResp = await fetch(
      `https://rickandmortyapi.com/api/location/${Array.from({ length: elemCnt }, (_, i) => i + 21).join(',')}`,
    );
    const rest = await restResp.json();

    const results = [...page1.results, ...rest];
    const unsortedLocations = Object.groupBy(results, (obj) =>
      obj.type ? obj.type : 'unknown',
    );
    const locations = Object.fromEntries(
      Object.entries(unsortedLocations).sort(
        (a, b) => b[1].length - a[1].length,
      ),
    );

    res.render('locations', { locations: locations });
  } catch {
    res.render('error');
  }
});

module.exports = router;
