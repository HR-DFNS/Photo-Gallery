const data = require('./allData.js');
const fs = require('fs');

function seedDb() {
  let entries = '';
  let c = 0;
  data.forEach((place) => { // for each ID
    const entry = {
      place_id: c,
      place_name: place.result.name,
      photos: [],
      reviews: [],
    };
    c += 1;
    // push photo details to entry
    const { photos } = place.result;
    let plen = photos.length;
    if (plen > 3) plen = 3;
    for (let i = 0; i < plen; i += 1) {
      const details = {
        url: `https://dummyimage.com/${photos[i].width}x${photos[i].height}/${photos[i].width}/${photos[i].height}.jpg`,
        width: photos[i].width,
        height: photos[i].height,
      };
      entry.photos.push(details);
    }

    // push each review to entry
    const { reviews } = place.result;
    let rlen = reviews.length;
    if (rlen > 3) rlen = 3;
    for (let j = 0; j < rlen; j += 1) {
      const review = {
        name: reviews[j].author_name,
        avatar: `https://dummyimage.com/${entry.photos[0].width}x${entry.photos[0].width}/${entry.photos[0].height}/${entry.photos[0].width}.jpg`,
      };
      entry.reviews.push(review);
    }
    entries += `${JSON.stringify(entry)},\n`;
  });
  return entries;
}

const totalEntries = seedDb();
fs.appendFile('newData.json', `,${totalEntries}`, (err) => {
  if (err) throw err;
  console.log('maybe it worked!');
  mongoose.disconnect();
});
  
