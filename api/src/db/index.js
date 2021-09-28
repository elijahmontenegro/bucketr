const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const Sequelize = require('sequelize');

const db = {};

// define the sequelize ORM instance and connect it to the db
const sequelize = new Sequelize(
  process.env.SEQUELIZE_DATABASE,
  process.env.SEQUELIZE_USERNAME,
  process.env.SEQUELIZE_PASSWORD,
  {
    host: process.env.SEQUELIZE_HOST,
    dialect: process.env.SEQUELIZE_DIALECT,
    storage: './session.postgres',
    define: {
      timestamps: true
    },
    logging: process.env.SEQUELIZE_LOGGING && ((data) => console.log('[DB]', data))
  }
);

// loading all sequelize models from the 'models' folder
fs.readdirSync(path.join(__dirname, './models'))
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, './models', file))(sequelize, Sequelize.DataTypes);

    db[model.name] = model;

    console.log(`[SEQUELIZE] (${path.join('./db/models', file)}) (${model.name}) model loaded.`);
  });

// define the relationships between the entities
Object.keys(db)
  .forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
