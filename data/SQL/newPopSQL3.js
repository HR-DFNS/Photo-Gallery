const faker = require('faker');
const fs = require('fs');

function getPlace(id) {
  return `${id}\t${faker.company.companyName()}\n`;
}

function getPhoto(id, place, reviewer) {
  const dim = faker.random.number({ min: 400, max: 1000 });
  return `${id}\t"https://dummyimage.com/${dim}x${dim / 2}/${dim}/${dim / 2}.jpg"\t${dim}\t${dim / 2}\t${place}\t${reviewer}\n`;
}

function getReviewer(id) {
  const dim = faker.random.number({ min: 100, max: 999 });
  return `${id}\t"${faker.name.findName()}"\t"https://dummyimage.com/100x100/${dim}/${dim / 2}.jpg"\n`;
}


function pop10Mill(count) {
  const place = fs.createWriteStream(`./data/SQL/3T/s${count}/places.txt`);
  const photo = fs.createWriteStream(`./data/SQL/3T/s${count}/photos.txt`);
  const reviewer = fs.createWriteStream(`./data/SQL/3T/s${count}/reviewers.txt`);

  const limit = 1000000;
  let pidx = ((count * limit * 3) + 1) - (limit * 3);
  for (let i = 1; i <= limit; i++) {
    const idx = ((count * limit) + i) - limit;
    place.write(getPlace(idx), () => {
      reviewer.write(getReviewer(idx), () => {
        photo.write(getPhoto(pidx++, idx, idx) +
                    getPhoto(pidx++, idx, idx) + getPhoto(pidx++, idx, idx), () => {
          if (i === limit) {
            console.log(count, 'done...');
            place.end(() => {
              reviewer.end(() => {
                photo.end(() => {
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

pop10Mill(1);
