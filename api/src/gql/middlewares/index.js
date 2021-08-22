const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

let array = [];

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const middleware = require(path.join(__dirname, file));
    array.push(middleware);
  });

module.exports = array;
