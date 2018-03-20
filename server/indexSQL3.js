require('newrelic');
// const express = require('express');
// const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const path = require('path');
// const cors = require('cors');

const Photos = require('../database/sqlIndex.js');

// const app = express();

// app.use(cors());

// app.use(bodyParser.json());

// // serve static files from dist dir
// app.use('/restaurants/:id', express.static(path.join(__dirname, '../client/dist')));

// // if no ID typed into url bar, redirect to this ID
// app.get('/', (req, res) => {
//   res.status(200).redirect('/restaurants/1000001');
// });

// // retrieve data from API(db)
// app.get('/api/restaurants/:id/gallery', (req, res) => {
//   const { id } = req.params;
//   // console.log('server querying for id: ', id);

//   Photos.findThree(id, (data) => {
//     res.json(data);
//   });
// });

// app.listen(3001, () => console.log('Gallery App listening on port 3001!'));

// module.exports = app;


const serve = (pathTo, res) => {
  fs.readFile(path.join(__dirname, pathTo), (err, bundle) => {
    if (err) throw err;
    res.write(bundle, () => {
      res.end();
    });
  });
};

const sendData = (id, res) => {
  Photos.findThree(id, (data) => {
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
}).listen(3001);
