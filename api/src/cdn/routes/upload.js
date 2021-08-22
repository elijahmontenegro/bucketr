const upload = (req, res) => {
  res.send('/ upload called successfully...');
};

module.exports = (express) => {
  express.get('/cdn/uploader', upload);
}
