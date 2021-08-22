const db = require('../src/db');

(async () => {
  await db.sequelize.sync({ force: true });

})();


