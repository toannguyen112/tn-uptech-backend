"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("jobs", {
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

      ceo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "ceos",
          key: "id",
        },
        allowNull: true,
      },

      related: {
        type: Sequelize.JSON,
        defaultValue: [],
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

      post_at: {
        type: Sequelize.DATE,
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

  down: (queryInterface) => queryInterface.dropTable("jobs"),
};
