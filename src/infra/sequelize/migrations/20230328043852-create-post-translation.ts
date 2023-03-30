"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("post_translation", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      post_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "posts",
          key: "id",
        },
      },

      slug: {
        type: Sequelize.STRING,
      },

      content: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      type: {
        type: Sequelize.STRING,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      locale: {
        type: Sequelize.STRING,
        defaultValue: "vi",
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

  down: (queryInterface) => queryInterface.dropTable("post_translation"),
};
