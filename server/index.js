const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

mongoose.connect('mongodb://localhost/photos');

const Photos = require('../database/sqlIndex.js');

const app = express();

app.use(cors());

app.use(bodyParser.json());

// serve static files from dist dir
app.use('/restaurants/:id', express.static(path.join(__dirname, '../client/dist')));

// if no ID typed into url bar, redirect to this ID
app.get('/', (req, res) => {
  res.status(200).redirect('/restaurants/1000001');
});

// retrieve data from API(db)
app.get('/api/restaurants/:id/gallery', (req, res) => {
  const { id } = req.params;
  console.log('server querying for id: ', id);

  Photos.findOne(id, (data) => {
    const result = { place_name: data[0].place_name };
    result.photos = [];
    result.reviews = [];
    for (let i = 0; i < data.length; i++) {
      result.photos.push({
        url: JSON.parse(data[i].url),
        width: data[i].width,
        height: data[i].height,
      });
      result.reviews.push({
        name: JSON.parse(data[i].name),
        avata: data[i].avatar,
      });
    }
    console.log(result);
    res.json([result]);
  });
});

app.listen(3001, () => console.log('Gallery App listening on port 3001!'));

module.exports = app;
