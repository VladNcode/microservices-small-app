const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const events = [];

app.post('/events', async (req, res) => {
  try {
    const event = req.body;
    events.push(event);

    await axios.post('http://posts-clusterip-srv:4000/events', event);
    // await axios.post('http://localhost:4001/events', event);
    // await axios.post('http://localhost:4002/events', event);
    // await axios.post('http://localhost:4003/events', event);

    res.send({ status: 'OK' });
  } catch (e) {
    console.log(e.message);
  }
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('test');
  console.log('Listening on 4005 (event-bus)');
});
