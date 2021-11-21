const  {
  User,
  Workspace,
  Board,
  sequelize
} = require('../src/db');


(async () => {
  await sequelize.sync({ force: true });

  await Workspace.create({
    name: "ATX QA",
    shortName: "atx-qa",
    boards: [
      { id: 1, name: 'Alpha' }
    ]
  }, {
    include: [{
      model: Board,
      as: 'boards'
    }],
  })
    .then(res => {
      console.log(res.get());
    })
    .catch(err => {
      console.log("Error while workspace creation : ", err);
    })

  // await User.bulkCreate([
  //   { email: 'test@test.com', displayName: 'Elijah Montenegro', password: "password" },
  //   { email: 'naruto.uzimaki@domain.com', displayName: 'Naruto Uzimaki', password: "password" },
  //   { email: 'suchiha@domain.com', displayName: 'Sasuke Uchiha', password: "password" },
  //   { email: 'hinatah@domain.com', displayName: 'Hinata Hyuga', password: "password" },
  // ])
  //   .then(new_users => {
  //     console.log(new_users);
  //   })
  //   .catch(err => {
  //     console.log("Error while users creation : ", err);
  //   })

  // Test relationships
  // Workspace.findAll({ include: 'boards' })
  //   .then((res) => {

  //   })
  //   .catch((err) => {
  //     console.log("Error while find user : ", err)
  //   })

  await Board.create({
    id: 2,
    name: "Pikachu",
    parentId: 1
  },
  {
    include: [Workspace],
  })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log("Error while find user : ", err)
    });

  await Board.findAll({ include: [Workspace] })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log("Error while find user : ", err)
    });

})();
