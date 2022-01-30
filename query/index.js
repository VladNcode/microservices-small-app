const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    let comment = posts[postId].comments.find(c => c.id === id);
    comment.content = content;
    comment.status = status;
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);
  res.send({});
});

app.listen(4002, async () => {
  try {
    console.log('Listening on port 4002 (query)');
    const res = await axios.get('http://event-bus-srv:4005/events');

    for (let event of res.data) {
      console.log(`Processing event ${event.type}`);
      handleEvent(event.type, event.data);
    }
  } catch (e) {
    console.log(e.message);
  }
});
