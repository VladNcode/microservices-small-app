const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const commentsByPostID = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostID[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { content } = req.body;
  const commentId = randomBytes(4).toString('hex');
  const comments = commentsByPostID[req.params.id] || [];

  comments.push({ id: commentId, content });
  commentsByPostID[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log('Recieved event: ' + req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on port 4001 (comments)');
});
