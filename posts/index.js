const express = require('express');
const { randomBytes } = require('crypto');

const app = express();

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});
app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  console.log(id);

  res.send({});
});

app.listen(3000, () => {
  console.log('Listening on port 3000 (posts)');
});
