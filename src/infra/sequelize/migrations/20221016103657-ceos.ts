"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("ceos", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      status: {
        type: Sequelize.STRING,
        defaultValue: "active"
      },

      thumbnail: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: "medias",
          key: "id",
        },
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

  down: (queryInterface) => queryInterface.dropTable("ceos"),
};
