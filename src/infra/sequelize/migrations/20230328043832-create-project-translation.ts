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

      description: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },

      slug: {
        type: Sequelize.STRING,
      },

      custom_slug: {
        type: Sequelize.STRING,
      },

    }),

  down: (queryInterface) => queryInterface.dropTable("project_translation"),
};
