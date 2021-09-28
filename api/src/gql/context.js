const db = require('../db');
const { buildContext } = require('graphql-passport');
const cookieParser = require('cookie-parser')

module.exports = async ({ request, response }) => {
  let ctx = {};

  ctx = buildContext({
    req: request,
    res: response
  });

  return ctx;
};
