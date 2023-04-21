"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("services", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      parent_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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

  down: (queryInterface) => queryInterface.dropTable("services"),
};
