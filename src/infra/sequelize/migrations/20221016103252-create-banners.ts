"use strict";
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("banners", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      position: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      image: {
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

  down: (queryInterface) => queryInterface.dropTable("banners"),
};
