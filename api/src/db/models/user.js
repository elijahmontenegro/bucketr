const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, { sequelize });
  }
};

const schema = {
  id: {
    allowNull: false,
    primaryKey: true,
    unique: true,
    type: Sequelize.STRING,
    validate: {
      len: [1, 128],
    },
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  photo: {
    type: Sequelize.STRING,
    allowNull: true
  },
  accessToken: {
    unique: true,
    type: Sequelize.TEXT,
  },
  refreshToken: {
    unique: true,
    type: Sequelize.TEXT,
  },
  timeExpiry: {
    type: Sequelize.DATE
  }
};

module.exports = User;
