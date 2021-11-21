const { resolver } = require('graphql-sequelize');
const db = require('../../../db');
const { Op } = require('sequelize');

module.exports = {
  Query: {
    workspaces: resolver(db.Workspace),
    boards: resolver(db.Workspace, {
      before: (findOptions, args) => {
        console.log('poop')
        findOptions.include = [db.Board]
        return findOptions;
      }
    })
  },
  Workspace: {
    boards: async (parent, args, ctx) => {
      console.log('big giant poop')
      const x = await parent.getBoards();
      console.log(parent);
      return await parent.getBoards();
    }
  },
  Mutation: {
    async createWorkspace(root, { data }, ctx) {
      const existingName = await db.Workspace.count({
        where: {
          name: {
            [Op.iLike]: data.name
          }
        }
      });

      if (existingName) {
        throw new Error('Sorry, this name already exists.');
      }

      const workspace = await db.Workspace.create(data);

      console.log(workspace);

      return workspace;
    },
    async updateWorkspace(root, { data }, ctx) {
      const workspace = await db.Workspace.update(
        {
          name: data.name
        },
        {
          where: {
            id: data.id
          }
        }
      );

      if (!workspace) {
        throw new Error('Workspace not found.');
      }

      return true;
    },
    async deleteWorkspace(root, { id }, ctx) {
      const workspace = await db.Workspace.findByPk(id);

      if (!workspace) {
        throw new Error('Workspace not found.');
      }

      await workspace.destroy();

      return true;
    },
  },
  // Subscription: {
  //   Workspace:  {
  //     boards: (_, args, { models }) => {
  //       console.log('test:', _);

  //       return models.Board.findAll({
  //         where: {
  //           workspaceId: _.id
  //         }
  //       })
  //     }
  //   }
  // }
};
