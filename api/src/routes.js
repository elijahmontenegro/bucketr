const glob = require('glob');

module.exports = async (server) => {
  glob('/**/routes/*.js', { root: __dirname }, (err, files) => {
    files.forEach(file => {
      const routeFn = require(file);
      console.log(`[SERVER] (${file.replace(__dirname + '\\', "")}) routes loaded.`);

      routeFn(server);
    });
  });
};
//
