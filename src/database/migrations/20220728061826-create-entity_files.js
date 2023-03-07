"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("entity_files", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      file_id: {
        type: Sequelize.STRING,
      },

      entity: {
        type: Sequelize.STRING,
      },

      zone: {
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

  down: (queryInterface) => queryInterface.dropTable("entity_files"),
};
