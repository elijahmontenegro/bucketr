const  {
  User,
  Workspace,
  Board,
  sequelize
} = require('../src/db');

module.exports = async () => {
  await sequelize.sync({ force: false });

  await Workspace.create({
    id: 1,
    name: "ATX QA",
    shortName: "atx-qa",
    boards: [
      { name: 'Alpha' }
    ]
  }, {
    include: [ Board ]
  })
    .catch(err => {
      console.log("Error while workspace creation : ", err);
    });

  await User.bulkCreate([
    { email: 'naruto.uzimaki@domain.com', displayName: 'Naruto Uzimaki', password: "password" },
    { email: 'suchiha@domain.com', displayName: 'Sasuke Uchiha', password: "password" },
    { email: 'hinatah@domain.com', displayName: 'Hinata Hyuga', password: "password" },
  ])
    .catch(err => {
      console.log("Error while users creation : ", err);
    });

};
