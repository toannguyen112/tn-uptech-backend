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

      thumbnail: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: "medias",
          key: "id",
        },
      },

      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      position: {
        type: Sequelize.INTEGER,
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

      deletedAt: {
        type: Sequelize.DATE, allowNull: true,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("banners"),
};
