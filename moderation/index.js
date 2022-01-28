const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const statusUpd = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId,
        status: statusUpd,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on port 4003 (moderation)');
});
