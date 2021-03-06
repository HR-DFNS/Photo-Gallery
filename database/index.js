const mongoose = require('mongoose');

const PhotosSchema = mongoose.Schema({
  url: String,
  width: Number,
  height: Number,
});

const ReviewSchema = mongoose.Schema({
  name: String,
  avatar: String,
});

const photoSchema = mongoose.Schema({
  _id: {
    type: Number,
  },
  place_name: String,
  photos: [PhotosSchema],
  reviews: [ReviewSchema],
});

const Photos = mongoose.model('Photos', photoSchema);

// check if database is already seeded;
function isSeeded() {
  console.log('checking db...');
  Photos.count({}, (err, count) => {
    if (err) throw err;
    console.log(count);
  });
}

// findAll retrieves all stories
function findAll(callback) {
  Photos.find({}, callback);
}

// findOne will retrieve the photo associated with the given id
function findOne(id, callback) {
  // console.log('database finding by id:', id);
  Photos.find({
    _id: id,
  }, callback);
}

// insertOne will insert on entry into database
function insertOne(entry, callback) {
  Photos.create(entry, callback);
}

exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
exports.isSeeded = isSeeded;
