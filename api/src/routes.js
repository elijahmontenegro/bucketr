const glob = require('glob');

module.exports = async (server) => {
  glob('/**/routes/*.js', { root: __dirname }, (err, files) => {
    files.forEach(file => {
      const route = require(file)(server);

      console.log(`[SERVER] routes loaded (${file.replace(__dirname + '\\', "")})`);

      return route;
    });
  });
};
