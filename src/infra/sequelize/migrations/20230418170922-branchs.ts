"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("branchs", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },

      deletedAt: {
        type: Sequelize.DATE, allowNull: true,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("branchs"),
};
