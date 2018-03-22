const path = require('path');
const mongoose = require('mongoose');
const Photos = require('../database/index.js');

mongoose.connect('mongodb://localhost/photos');

//*
const fs = require('fs');
const http = require('http');

const serve = (pathTo, res) => {
  fs.readFile(path.join(__dirname, pathTo), (err, file) => {
    if (err) throw err;
    res.write(file, () => {
      res.end();
    });
  });
};

const sendData = (id, res) => {
  Photos.findOne(id, (err, data) => {
    if (err) throw err;
    res.writeContinue();
    res.write(JSON.stringify(data), () => {
      res.end();
    });
  });
};

http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(302, {
        'Content-Type': 'text/html',
        Location: '/restaurants/1',
      });
      serve('../client/dist/index.html', res);
    } else if (req.url.split('/')[3] === 'bundle.js') {
      serve('../client/dist/bundle.js', res);
    } else {
      const urlPath = req.url.split('/');
      if (urlPath[4] === 'gallery') {
        if (urlPath[3] === 'undefined') {
          sendData(1, res);
        } else {
          sendData(Number(urlPath[3]), res);
        }
      } else {
        serve('../client/dist/index.html', res);
      }
    }
  }
}).listen(3001);

/*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
  Photos.findOne(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    res.json(data);
  });
});

app.listen(3001, () => console.log('Gallery App listening on port 3001!'));

module.exports = app;
//*/
