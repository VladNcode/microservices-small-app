const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/posts', (req, res) => {});
app.post('/events', (req, res) => {});

app.listen(4002, () => {
  console.log('Listening on port 4002 (query)');
});
