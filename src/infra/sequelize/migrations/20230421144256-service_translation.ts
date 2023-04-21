"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("service_translation", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      service_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "services",
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

  down: (queryInterface) => queryInterface.dropTable("service_translation"),
};
