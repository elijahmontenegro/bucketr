module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    name: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      // get() {
      //   return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
      // }
    },
  });

  Board.associate = models => {
    Board.belongsTo(models.Workspace, {
      foreignKey: 'parentId' // foreignKey should match the parent in a belongsTo/hasMany relationship.
    });
  }

  return Board;
};
