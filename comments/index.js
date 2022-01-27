const express = require('express');
const { randomBytes } = require('crypto');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const commentsByPostID = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostID[req.params.id] || []);
});
app.post('/posts/:id/comments', (req, res) => {
  const { content } = req.body;
  const commentId = randomBytes(4).toString('hex');
  const comments = commentsByPostID[req.params.id] || [];

  comments.push({ id: commentId, content });
  commentsByPostID[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(3001, () => {
  console.log('Listening on port 3001 (comments)');
});
