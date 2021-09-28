const graphQLServer = require('./gql');
const express = graphQLServer.express;
const { sequelize } = require('./db');

require('./idm')(express);
require('./routes')(express);

module.exports = async () => {
  try {
    await sequelize.authenticate();
    console.log('[DB] Connection has been established successfully.');
  } catch (error) {
    console.error('[DB] Unable to connect to the database:', error);
  }

  const app = await graphQLServer.start({
    port: process.env.PORT,
    cors: {
      credentials: true,
      origin: 'http://localhost:3000',
      methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
    }
  });

  console.log('[SERVER] Running on', app.address());

  return app;
};
