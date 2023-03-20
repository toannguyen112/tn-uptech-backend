"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("regions", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      country_id: {
        type: Sequelize.STRING,
      },

      level: {
        type: Sequelize.STRING,
      },

      code: {
        type: Sequelize.STRING,
      },

      parent_code: {
        type: Sequelize.STRING,
      },

      type: {
        type: Sequelize.STRING,
      },

      name: {
        type: Sequelize.STRING,
      },

      name_with_type: {
        type: Sequelize.STRING,
      },

      path: {
        type: Sequelize.STRING,
      },

      path_with_type: {
        type: Sequelize.STRING,
      },

      sort: {
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

  down: (queryInterface) => queryInterface.dropTable("regions"),
};
