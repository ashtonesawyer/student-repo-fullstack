const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

app.get('/', (_req, res) => {
  res.status(200);
  res.set({ 'Content-Type': 'text/html' });
  res.send('Express Routing Exercise');
});

// Add your code here

app.get('/welcome', (_req, res) => {
  res.set({ 'Content-Type': 'text/html' });
  res.status(200).send('<h1>Welcome Friend!</h1>');
});

app.get('/redirect', (_req, res) => {
  res.redirect('/redirected'); // defaults to 302
});

app.get('/redirected', (_req, res) => {
  res.set({ 'Content-Type': 'text/html' });
  res.status(200).send('<p>Thou hast been redirect-ed</p>');
});

app.get('/cache', (_req, res) => {
  res.set({
    'Content-Type': 'text/html',
    'Cache-Control': `max-age=${60 * 60 * 24}`,
  });
  res.status(200).send('<p>this resource was cached</p>');
});

app.get('/cookie', (_req, res) => {
  res.set({ 'Content-Type': 'text/plain' });
  res.cookie('hello', 'world');
  res.status(200).send('cookies... yummm');
});

// must be at bottom
app.use((_req, res, _next) => {
  res.set({ 'Content-Type': 'text/html' });
  res.status(404).send('<h1>404 - page not found</h1>');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
