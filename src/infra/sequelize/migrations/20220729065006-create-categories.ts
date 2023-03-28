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

      name: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      type: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      status: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      slug: {
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
    }),

  down: (queryInterface) => queryInterface.dropTable("categories"),
};
