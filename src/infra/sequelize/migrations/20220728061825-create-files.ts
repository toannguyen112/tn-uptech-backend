"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("files", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      filename: {
        type: Sequelize.STRING,
      },

      disk: {
        type: Sequelize.STRING,
      },

      path: {
        type: Sequelize.STRING,
      },

      extension: {
        type: Sequelize.STRING,
      },

      mime: {
        type: Sequelize.STRING,
      },

      size: {
        type: Sequelize.INTEGER,
      },

      width: {
        type: Sequelize.INTEGER,
      },

      height: {
        type: Sequelize.INTEGER,
      },

      alt: {
        type: Sequelize.STRING,
      },

      creator: {
        type: Sequelize.STRING,
      },

      editor: {
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

  down: (queryInterface) => queryInterface.dropTable("files"),
};
