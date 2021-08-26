const graphQLServer = require('./gql');
const loadRoutes = require('./routes');
const passport = require('./idm');
const express = graphQLServer.express;
const { sequelize } = require('./db');

express.use(passport.initialize());
express.use(passport.session());

loadRoutes(express);

module.exports = async () => {
  try {
    await sequelize.authenticate();
    console.log('[DB] Connection has been established successfully.');
  } catch (error) {
    console.error('[DB] Unable to connect to the database:', error);
  }

  const app = await graphQLServer.start({ port: process.env.PORT, cors: { origin: '*' } });
  console.log('[SERVER] Running on', app.address());

  return app;
};
