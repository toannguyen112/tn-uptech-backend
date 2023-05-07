"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("categories", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      status: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      link: {
        allowNull: true,
        type: Sequelize.STRING,
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

  down: (queryInterface) => queryInterface.dropTable("categories"),
};
