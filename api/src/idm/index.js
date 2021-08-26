const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const passport = require('passport');
const refresh = require('passport-oauth2-refresh');

// Recursive load strategies
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
    refresh.use(strategy);

    console.log(`[SERVER] (${path.join(basePath, file).replace(__dirname + '\\', "idm\\")}) auth strategy loaded.`);
  });
//

// Serialize user
passport.serializeUser((user, cb) => {
  console.log('serialize');

  cb(null, user)
});

passport.deserializeUser((obj, cb) => {
  console.log('deserialize');

  cb(null, obj)
});
//

module.exports = passport;
