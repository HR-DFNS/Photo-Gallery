const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const Photos = require('../database/sqlIndex.js');

const app = express();

app.use(cors());

app.use(bodyParser.json());

// serve static files from dist dir
app.use('/restaurants/:id', express.static(path.join(__dirname, '../client/dist')));

// if no ID typed into url bar, redirect to this ID
app.get('/', (req, res) => {
  res.status(200).redirect('/restaurants/1');
});

// retrieve data from API(db)
app.get('/api/restaurants/:id/gallery', (req, res) => {
  const { id } = req.params;
  // console.log('server querying for id: ', id);

  Photos.findOne(id, (data) => {
    res.status(290);
    res.json(data);
  });
});

app.listen(3001, () => console.log('Gallery App listening on port 3001!'));

module.exports = app;
