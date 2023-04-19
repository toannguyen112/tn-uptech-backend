"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("ceo_translation", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      ceo_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "ceos",
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
      },

      title: {
        type: Sequelize.STRING,
      },

      description: {
        type: Sequelize.TEXT('long'),
      },

      detail: {
        type: Sequelize.TEXT('long'),
      },

      date: {
        type: Sequelize.STRING,
      },

      phone: {
        type: Sequelize.STRING,
      },

      email: {
        type: Sequelize.STRING,
      },

      position: {
        type: Sequelize.STRING,
      },

      work_at: {
        type: Sequelize.STRING,
      },

      lang: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      address: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      social: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      education: {
        allowNull: true,
        type: Sequelize.TEXT('long'),
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

  down: (queryInterface) => queryInterface.dropTable("ceo_translation"),
};
