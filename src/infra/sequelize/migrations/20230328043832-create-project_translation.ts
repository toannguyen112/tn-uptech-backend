"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("project_translation", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      project_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "projects",
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

      work_item: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: []
      },

      description: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },

      section_1: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },

      section_2: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },

      section_3: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },

      section_4: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },

      section_5: {
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

  down: (queryInterface) => queryInterface.dropTable("project_translation"),
};
