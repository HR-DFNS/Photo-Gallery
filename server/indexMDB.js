const path = require('path');
const mongoose = require('mongoose');
const Photos = require('../database/index.js');
const redis = require('redis');

const port = 3001;
mongoose.connect('mongodb://52.8.250.153:27017/photos');

/*
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
  console.log(req.url);
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
}).listen(port);

/ */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(bodyParser.json());
//app.use(morgan('dev'));

const client = redis.createClient(6379, '54.176.243.14');
//const client = redis.createClient();
client.on('connect', () => {
  client.flushdb((err, succeeded) => {
    console.log(succeeded); // will be true if successfull
  });
});

// serve static files from dist dir
app.use('/restaurants/:id', express.static(path.join(__dirname, '../client/dist')));

// if no ID typed into url bar, redirect to this ID
app.get('/', (req, res) => {
  res.status(200).redirect('/restaurants/1');
});

// retrieve data from API(db)
app.get('/api/restaurants/:id/gallery', (req, res) => {
  client.exists(req.params.id, (err, reply) => {
     if (reply === 1) {
       client.get(req.params.id, (rerr, data) => {
         res.json(JSON.parse([data]));
       });
  } else {
      Photos.findOne(req.params.id, (dberr, data) => {
        if (dberr) {
          res.sendStatus(500);
        } else {
          client.setex(req.params.id, 600, JSON.stringify(data));
          res.json(data);
        }
      });
   }
 });
});

app.listen(port, () => console.log(`Gallery App listening on port ${port}!`));

module.exports = app;
// */
