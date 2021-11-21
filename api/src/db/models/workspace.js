
module.exports = (sequelize, DataTypes) => {
  const Workspace = sequelize.define('Workspace', {
    name: {
      type: DataTypes.STRING,
    },
    shortName: {
      type: DataTypes.STRING,
    },
  });

  Workspace.associate = (models) => {
    Workspace.hasMany(models.Board, {
      foreignKey: 'parentId',
      as: 'boards'
    });
  };

  return Workspace;
};
