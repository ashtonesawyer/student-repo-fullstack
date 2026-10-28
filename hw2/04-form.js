const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, comments, newsletter sign up, and submit button.

// http://localhost:5001/submit should return all the data the user entered

app.use(express.urlencoded({ extended: true }));

app.get('/form', (_req, res) => {
  res.status(200).type('html').sendFile(path.join(__dirname, 'form.html'));
});

app.post('/submit', (req, res) => {
  const { user, email, comments } = req.body;
  const resp = {
    user,
    email,
    comments,
    subscribe: req.body.subscribe ? 'yes' : 'no',
  };
  res.status(200).json(resp);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
