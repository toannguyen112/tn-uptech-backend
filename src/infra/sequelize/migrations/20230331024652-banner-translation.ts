"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("banner_translation", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      banner_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "banners",
          key: "id",
        },
      },

      name: {
        type: Sequelize.STRING,
      },

      sub_name: {
        type: Sequelize.STRING,
      },

      desctiption: {
        type: Sequelize.STRING,
      },

      slug: {
        type: Sequelize.STRING,
      },

      custom_slug: {
        type: Sequelize.STRING,
      },

    }),

  down: (queryInterface) => queryInterface.dropTable("banner_translation"),
};
