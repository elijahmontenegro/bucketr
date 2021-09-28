// do i really need this

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    uid: {
      type: DataTypes.UUID
    },
    expires: {
      type: DataTypes.DATE
    },
    data: {
      type: DataTypes.TEXT
    }
  });

  return Session;
};
