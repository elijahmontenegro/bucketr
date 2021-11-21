const startServer = require('../src/app');
const seedDatabase = require('./seed');
const db = require('../src/db');

(async () => {
  await db.sequelize.sync({ force: false });

  // if(process.env.NODE_ENV !== "production") {
  //   await seedDatabase();
  // }

  await startServer();

})();
