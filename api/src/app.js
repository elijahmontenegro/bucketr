const graphQLServer = require('./gql');
const loadRoutes = require('./routes');
const { sequelize } = require('./db');

// loadIdManager(graphQLServer.express);
loadRoutes(graphQLServer.express);

module.exports = async () => {
  const app = await graphQLServer.start({ port: process.env.PORT, cors: { origin: '*' } });
  console.log('[SERVER] Running on', app.address());

  try {
    await sequelize.authenticate();
    console.log('[DB] Connection has been established successfully.');
  } catch (error) {
    console.error('[DB] Unable to connect to the database:', error);
  }

  return app;
};;
