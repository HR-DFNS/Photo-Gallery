const faker = require('faker');
const fs = require('fs');


/*
  id INT PRIMARY KEY,
  place_name VARCHAR(255),
  url1 VARCHAR(100),
  width1 INT,
  height1 INT,
  rname1 VARCHAR(50),
  avatar1 VARCHAR(100),
  url2 VARCHAR(100),
  width2 INT,
  height2 INT,
  rname2 VARCHAR(50),
  avatar2 VARCHAR(100),
  url3 VARCHAR(100),
  width3 INT,
  height3 INT,
  rname3 VARCHAR(50),
  avatar3 VARCHAR(100)
*/
function getPlace(id) {
  const dim1 = faker.random.number({ min: 400, max: 1000 });
  const dim2 = faker.random.number({ min: 400, max: 1000 });
  const dim3 = faker.random.number({ min: 400, max: 1000 });
  return `${id}\t${faker.company.companyName()}\thttps://dummyimage.com/${dim1}x${dim1 / 2}/${dim1}/${dim1 / 2}.jpg\t${dim1}\t${dim1 / 2}\t${faker.name.findName()}\thttps://dummyimage.com/100x100/${dim1}/${dim1 / 2}.jpg\thttps://dummyimage.com/${dim2}x${dim2 / 2}/${dim2}/${dim2 / 2}.jpg\t${dim2}\t${dim2 / 2}\t${faker.name.findName()}\thttps://dummyimage.com/100x100/${dim2}/${dim2 / 2}.jpg\thttps://dummyimage.com/${dim3}x${dim3 / 2}/${dim3}/${dim3 / 2}.jpg\t${dim3}\t${dim3 / 2}\t${faker.name.findName()}\thttps://dummyimage.com/100x100/${dim3}/${dim3 / 2}.jpg\n`;
}

function pop10Mill(count) {
  const place = fs.createWriteStream(`./data/SQL/1T/s${count}/places1.txt`);
  const limit = 1000000;

  for (let i = 1; i <= limit; i++) {
    const idx = ((count * limit) + i) - limit;

    place.write(getPlace(idx), () => {
      if (i === limit) {
        console.log(count, 'done...');

        place.end(() => {
          if (count < 10) {
            pop10Mill(++count);
          }
        });
      }
    });
  }
}

pop10Mill(1);
