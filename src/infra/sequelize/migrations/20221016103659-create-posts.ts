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
        onDelete: 'SET NULL',
      },

      ceo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "ceos",
          key: "id",
        },
        allowNull: true,
        onDelete: 'SET NULL',
      },

      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
        allowNull: true,
        onDelete: 'SET NULL',
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
        onDelete: 'SET NULL',
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

      posted_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
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
        type: Sequelize.DATE,
        allowNull: true,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("posts"),
};
