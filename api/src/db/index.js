const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize(process.env.SEQUELIZE_DATABASE, process.env.SEQUELIZE_USERNAME, process.env.SEQUELIZE_PASSWORD, {
  host: process.env.SEQUELIZE_HOST,
  dialect: process.env.SEQUELIZE_DIALECT,
  logging: process.env.SEQUELIZE_LOGGING && ((data) => console.log('[DB]', data))
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const basePath = path.join(__dirname, '/models');

fs.readdirSync(basePath)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(basePath, file));

    if (model.init) {
      model.init(sequelize);
    } else {
      model(sequelize, Sequelize);
    }

    db[model.name] = model;

    console.log(`[SERVER] (${path.join(basePath, file).replace(__dirname + '\\', "db\\")}) (${model.name}) model loaded.`);
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
