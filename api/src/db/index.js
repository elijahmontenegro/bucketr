const { readdirSync } = require('fs');
const path = require('path');
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

readdirSync(basePath)
  .forEach(file => {
    const model = require(path.join(basePath, file));

    if (model.init) {
      model.init(sequelize);
    } else {
      model(sequelize, Sequelize);
    }

    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
