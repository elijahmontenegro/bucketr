const error = (req, res) => {
  res.send('/ error called successfully...');
};

module.exports = (express) => {
  express.get('/auth/error', error);
}
