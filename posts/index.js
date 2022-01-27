const express = require('express');
const { randomBytes } = require('crypto');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});
app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = { id, title };

  res.status(201).json({
    status: 'success',
    data: { post: posts[id] },
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000 (posts)');
});