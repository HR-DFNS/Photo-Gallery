const faker = require('faker');
const fs = require('fs');

const limit = 1000000;

// id INT PRIMARY KEY, name VARCHAR(255)
function getPlace(id) {
  return `${id}\t${faker.company.companyName()}\n`;
}

// id INT PRIMARY KEY, url VARCHAR(100), width INT, height INT, reviewer_id INT
function getPhoto(id, reviewer) {
  const dim = faker.random.number({ min: 400, max: 1000 });
  return `${id}\t"https://dummyimage.com/${dim}x${Math.floor(dim/2)}/${dim}/${Math.floor(dim/2)}.jpg"\t${dim}\t${Math.floor(dim/2)}\t${reviewer}\n`;
}

// id INT PRIMARY KEY, name VARCHAR(50), avatar VARCHAR(100)
function getReviewer(id) {
  const dim = faker.random.number({ min: 100, max: 999 });
  return `${id}\t"${faker.name.findName()}"\t"https://dummyimage.com/100x100/${dim}/${Math.floor(dim/2)}.jpg"\n`;
}

// place_id INT, photo_id INT
function getPP(id) {
  const pid1 = faker.random.number({ min: 1, max: 200 });
  const pid2 = faker.random.number({ min: 1, max: 200 });
  const pid3 = faker.random.number({ min: 1, max: 200 });

  return `${id}\t${pid1}\n${id}\t${pid2}\n${id}\t${pid3}\n`;
}

function pop10Mill(count) {
  const place = fs.createWriteStream(`./data/SQL/3T/s${count}/places.txt`);
  const placesPhotos = fs.createWriteStream(`./data/SQL/3T/s${count}/places_photos.txt`);
  const reviewer = fs.createWriteStream(`./data/SQL/3T/s${count}/reviewers.txt`);

  for (let i = 1; i <= limit; i++) {
    const idx = ((count * limit) + i) - limit;
    place.write(getPlace(idx), () => {
      reviewer.write(getReviewer(idx), () => {
        placesPhotos.write(getPP(idx), () => {
          if (i === limit) {
            console.log(count, 'done...');
            place.end(() => {
              reviewer.end(() => {
                placesPhotos.end(() => {
                  if (count < 10) {
                    pop10Mill(++count);
                  }
                });
              });
            });
          }
        });
      });
    });
  }
}
function popPhotos() {
  const photo = fs.createWriteStream('./data/SQL/3T/photos.txt');
  for (let i = 1; i <= 200; i++) {
    photo.write(getPhoto(i, faker.random.number({ min: 1, max: limit })), () => {
      if (i === 200) {
        photo.end(() => {
          pop10Mill(1);
        });
      }
    });
  }
}

popPhotos();
