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
        onDelete: 'CASCADE',
        references: {
          model: "posts",
          key: "id",
        },
      },

      locale: {
        type: Sequelize.STRING,
        defaultValue: "vi",
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      content: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },

      slug: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },

      custom_slug: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },

    }),

  down: (queryInterface) => queryInterface.dropTable("post_translation"),
};
