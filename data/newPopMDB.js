const faker = require('faker');
const fs = require('fs');


function getEntry(id) {
  const entry = { place_id: id };
  entry.place_name = faker.company.companyName();
  const photos = [];
  const reviews = [];
  for (let i = 0; i < 3; i += 1) {
    const dim = faker.random.number({ min: 400, max: 1000 });
    const img = `https://dummyimage.com/${dim}x${dim / 2}/${dim}/${dim / 2}.jpg`;
    photos.push({
      url: img,
      width: dim,
      height: dim,
    });
    reviews.push({
      name: faker.name.findName(),
      avatar: img,
    });
  }
  entry.photos = photos;
  entry.reviews = reviews;
  return JSON.stringify(entry);
}

function pop10Mill(count) {
  const x1 = process.hrtime();
  const limit = 1e6;
  setTimeout(() => {
    const file = fs.createWriteStream(`newData${count}.json`);
    file.write('[');
    console.log(`Populating newData${count}.json...`);

    for (let i = 1; i <= limit; i += 1) {
      let entry = getEntry(((count * limit) + i) - limit);
      if (i !== limit) {
        entry += ',\n';
      }
      file.write(entry, (err) => {
        if (err) throw err;
      });
    }

    file.write(']', (err) => {
      if (err) throw err;
      file.end(() => {
        console.log('Total: ', process.hrtime()[0] - x1[0]);
      });
    });

    if (count <= 10) {
      pop10Mill(count + 1);
    }
  }, 5000);
}

pop10Mill(1);
