const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('../db');

// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

module.exports = async (express) => {
  express.use(bodyParser.json());
  express.use(bodyParser.urlencoded({ extended: true }));

  // Recursive load strategies
  (() => {
    const basePath = path.join(__dirname, '/strategies');
    fs.readdirSync(basePath)
      .filter(file => {
        return (
          file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
        );
      })
      .forEach(file => {
        const strategy = require(path.join(basePath, file));
        passport.use(strategy);
        // refresh.use(strategy);
        console.log(`[IDM] (${path.join(basePath, file).replace(__dirname + '\\', "idm\\")}) auth strategy loaded.`);
      });
  })();

  passport.serializeUser(db.User.serializeUser);
  passport.deserializeUser(db.User.deserializeUser);

  const sequelizeStore = new SequelizeStore({
    db: db.sequelize,
    table: 'Session',
    extendDefaultFields: (defaults, session) => ({
      data: defaults.data,
      expires: defaults.expires,
      uid: session.passport.user
    })
  });

  express.use(session({
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sequelizeStore,
    cookie: {
      httpOnly: false,
      secure: process.env.NODE_ENV == "production",
    }
  }));

  express.use(passport.initialize());
  express.use(passport.session());
};
