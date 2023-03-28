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
        type: Sequelize.STRING,
        references: {
          model: "medias",
          key: "id",
        },
      },

      banner: {
        type: Sequelize.STRING,
        references: {
          model: "medias",
          key: "id",
        },
      },

      images: {
        type: Sequelize.JSON,
        defaultValue: []
      },

      name: {
        type: Sequelize.STRING,
      },

      type: {
        type: Sequelize.STRING,
      },

      description: {
        type: Sequelize.STRING,
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

      content: {
        type: Sequelize.STRING,
        allowNull: true,
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
