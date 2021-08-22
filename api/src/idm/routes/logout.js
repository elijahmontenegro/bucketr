const logout = (req, res) => {
  res.send('/ logout called successfully...');
};

module.exports = (express) => {
  express.get('/auth/logout', logout);
}
