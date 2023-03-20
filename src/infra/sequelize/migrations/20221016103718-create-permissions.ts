"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("permissions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      perm_name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      perm_description: {
        type: Sequelize.STRING,
        unique: false
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

  down: (queryInterface) => queryInterface.dropTable("permissions"),
};
