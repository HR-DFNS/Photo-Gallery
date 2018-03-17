const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'PhotoGallery',
});

// function findOne(id, callback) {
//   db.query(`SELECT places.name as place_name, photos.url, photos.width, photos.height,
//   reviewers.name, reviewers.avatar FROM photos
//   JOIN places ON photos.places_id=places.id
//   JOIN reviewers ON photos.reviewer_id=reviewers.id
//   WHERE places.id=${id};`, (qerr, res) => {
//     if (qerr) throw qerr;
//     callback(res);
//   });
// }
function findOne(id, callback) {
  db.execute(`SELECT * FROM places1 WHERE id=${id};`, (qerr, res) => {
    if (qerr) throw qerr;
    callback(res);
  });
}
function findThree(id, callback) {
  db.execute(`SELECT places.name as place_name, photos.url, photos.width, photos.height, reviewers.name, reviewers.avatar FROM photos
  JOIN places ON photos.places_id=places.id 
  JOIN reviewers ON photos.reviewer_id=reviewers.id 
  WHERE places.id=${id};`, (qerr, res) => {
    if (qerr) throw qerr;
    callback(res);
  });
}

exports.findOne = findOne;
exports.findThree = findThree;
