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

      slug: {
        allowNull: true,
        type: Sequelize.STRING,
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

      custom_slug: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      name: {
        type: Sequelize.STRING,
      },

      description: {
        type: Sequelize.STRING,
      },

      detail: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("ceo_translation"),
};
