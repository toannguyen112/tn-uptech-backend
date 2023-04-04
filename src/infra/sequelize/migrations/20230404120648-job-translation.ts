"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("job_translation", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      job_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "jobs",
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

  down: (queryInterface) => queryInterface.dropTable("job_translation"),
};
