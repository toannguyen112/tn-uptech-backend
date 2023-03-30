"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("posts", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      thumbnail: {
        type: Sequelize.INTEGER,
        references: {
          model: "medias",
          key: "id",
        },
        allowNull: true,
      },

      banner: {
        type: Sequelize.INTEGER,
        references: {
          model: "medias",
          key: "id",
        },
        allowNull: true,
      },

      images: {
        type: Sequelize.JSON,
        defaultValue: [],
        allowNull: true,
      },

      isFeatured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      status: {
        type: Sequelize.STRING,
        defaultValue: "active"
      },

      view: {
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

  down: (queryInterface) => queryInterface.dropTable("posts"),
};
