const recluster = require('recluster');
const path = require('path');

const cluster = recluster(path.join(__dirname, 'indexMDB.js'));
cluster.run();

process.on('SIGUSR2', () => {
  console.log('Got SIGUSR2, reloading cluster...');
  cluster.reload();
});

console.log('spawned cluster, kill -s SIGUSR2', process.pid, 'to reload');
