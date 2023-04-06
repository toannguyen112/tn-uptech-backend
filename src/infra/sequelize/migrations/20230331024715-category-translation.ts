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

      slug: {
        allowNull: true,
        type: Sequelize.STRING,
      },

    }),

  down: (queryInterface) => queryInterface.dropTable("category_translation"),
};
