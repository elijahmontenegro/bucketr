const login = (req, res) => {
  res.send('/ login called successfully...');
};

module.exports = (express) => {
  express.get('/auth/callback', login);
}
