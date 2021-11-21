const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    accountId: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        len: [1, 128],
      },
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    validated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM('MEMBER', 'ADMIN', 'GUEST'),
      defaultValue: 'MEMBER',
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    accessToken: {
      unique: true,
      type: DataTypes.TEXT,
    },
    refreshToken: {
      unique: true,
      type: DataTypes.TEXT,
    },
    timeExpiry: {
      type: DataTypes.DATE
    }
  });

  User.beforeCreate((user) => {
    return user.id = uuid();
  });

  User.serializeUser = function (user, done) {
    done(null, user.id)
  };

  User.deserializeUser = async function (id, done) {
    const user = await User.findOne({ where: { id } });
    if(!user) {
      done(new Error('User not found.'), null);
    }
    done(null, user);
  };

  User.checkPassword = async function (email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) return { user: null, validLogin: false };
    const validLogin = await user.checkPassword(password);
    return { user, validLogin };
  };

  User.prototype.checkPassword = function(password) {
    return new Promise((res, rej) =>
      bcrypt.compare(password, this.password, (err, resp) => {
        if (err) return rej(err);
        return res(resp);
      })
    );
  };

  return User;
};
