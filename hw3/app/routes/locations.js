var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const getJson = async function getJson(url) {
    const resp = await fetch(url);

    // just throw them away, not worth retry
    if (!resp.ok) {
      console.log(`Error: ${resp.status} ${url}`);
      return Promise.resolve({ results: [] });
    }
    return resp.json();
  };

  try {
    const resp = await fetch('https://rickandmortyapi.com/api/location');
    const page1 = await resp.json();

    const pageCnt = page1.info.pages;
    const pages = Array.from({ length: pageCnt - 1 }, (_, i) => i + 2);

    const pageRes = await Promise.all(
      pages.map(async (page) =>
        getJson(`https://rickandmortyapi.com/api/location?page=${page}`),
      ),
    );

    const results = [page1.results, ...pageRes].flatMap(
      (page) => page.results ?? [],
    );
    const locations = Object.groupBy(results, (obj) =>
      obj.type ? obj.type : 'unknown',
    );

    res.render('locations', { locations: locations });
  } catch {
    res.render('error');
  }
});

module.exports = router;
