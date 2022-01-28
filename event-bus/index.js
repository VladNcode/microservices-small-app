const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.post('/events', async (req, res) => {
  // const event = req.body;

  // axios.post('http://localhost:4000/events', event).catch(e => console.log(e.message));

  // axios.post('http://localhost:4001/events', event).catch(e => console.log(e.message));

  // axios.post('http://localhost:4002/events', event).catch(e => console.log(e.message));

  // axios.post('http://localhost:4003/events', event).catch(e => console.log(e.message));
  try {
    const event = req.body;

    await axios.post('http://localhost:4000/events', event);
    await axios.post('http://localhost:4001/events', event);
    await axios.post('http://localhost:4002/events', event);
    await axios.post('http://localhost:4003/events', event);

    res.send({ status: 'OK' });
  } catch (e) {
    console.log(e.message);
  }
});

app.listen(4005, () => {
  console.log('Listening on 4005 (event-bus)');
});
