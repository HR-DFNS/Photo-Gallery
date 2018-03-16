const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'PhotoGallery',
});

function findOne(id, callback) {
  db.query(`SELECT places.name as place_name, photos.url, photos.width, photos.height, reviewers.name, reviewers.avatar FROM photos
  JOIN places ON photos.places_id=places.id 
  JOIN reviewers ON photos.reviewer_id=reviewers.id 
  WHERE places.id=${id};`, (qerr, res) => {
    if (qerr) throw qerr;
    callback(res);
  });
}

exports.findOne = findOne;
