"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("category_translation", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      category_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "categories",
          key: "id",
        },
      },

      locale: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },

      // seo

      slug: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      custom_slug: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      meta_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      meta_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      meta_keyword: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      meta_robots: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      canonica_link: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      meta_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      meta_viewport: {
        type: Sequelize.STRING,
        allowNull: true,
      },

    }),

  down: (queryInterface) => queryInterface.dropTable("category_translation"),
};
