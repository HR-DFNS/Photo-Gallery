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
    const result = { place_name: res[0].place_name };
    result.photos = [];
    result.reviews = [];
    for (let i = 1; i <= 3; i++) {
      result.photos.push({
        url: res[0][`url${i}`],
        width: res[0][`width${i}`],
        height: res[0][`height${i}`],
      });
      result.reviews.push({
        name: res[0][`rname${i}`],
        avatar: res[0][`avatar${i}`],
      });
    }
    callback([result]);
  });
}
function findThree(id, callback) {
  db.execute(`SELECT places.name as place_name, photos.url, photos.width, photos.height, reviewers.name, reviewers.avatar FROM photos
  JOIN places ON photos.places_id=places.id 
  JOIN reviewers ON photos.reviewer_id=reviewers.id 
  WHERE places.id=${id};`, (qerr, res) => {
    if (qerr) throw qerr;

    const result = { place_name: res[0].place_name };
    result.photos = [];
    result.reviews = [];
    for (let i = 0; i < res.length; i++) {
      result.photos.push({
        url: JSON.parse(res[i].url),
        width: res[i].width,
        height: res[i].height,
      });
      result.reviews.push({
        name: JSON.parse(res[i].name),
        avata: res[i].avatar,
      });
    }
    callback([result]);
  });
}

exports.findOne = findOne;
exports.findThree = findThree;
