const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.post('/events', async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
      const statusUpd = data.content.includes('orange') ? 'rejected' : 'approved';

      await axios.post('http://event-bus-srv:4005/events', {
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
  } catch (e) {
    console.log(e.message);
  }
});

app.listen(4003, async () => {
  try {
    console.log('Listening on port 4003 (moderation)');
    let res = await axios.get('http://event-bus-srv:4005/events');

    // console.log(res.data.length);
    let lastModeratedIndex = 0;
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].type === 'CommentModerated') {
        lastModeratedIndex = i;
      }
      if (i === res.data.length - 1) {
        res.data = res.data.slice(lastModeratedIndex + 1);
      }
    }
    // console.log(lastModeratedIndex);
    // console.log(res.data.length);
    // console.log(res.data);

    for (let event of res.data) {
      // console.log(event);
      if (event.type === 'CommentCreated') {
        const { id, content, postId } = event.data;
        const statusUpd = content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://event-bus-srv:4005/events', {
          type: 'CommentModerated',
          data: {
            id,
            content,
            postId,
            status: statusUpd,
          },
        });
      }
    }
  } catch (e) {
    console.log(e.message);
  }
});
