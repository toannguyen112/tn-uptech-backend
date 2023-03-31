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

      slug: {
        type: Sequelize.STRING,
      },

      custom_slug: {
        type: Sequelize.STRING,
      },

    }),

  down: (queryInterface) => queryInterface.dropTable("post_translation"),
};
