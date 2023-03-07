"use strict";
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("themes", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      name: {
        type: Sequelize.STRING,
      },

      status: {
        type: Sequelize.STRING,
        allowNull: true,
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

  down: (queryInterface) => queryInterface.dropTable("themes"),
};
