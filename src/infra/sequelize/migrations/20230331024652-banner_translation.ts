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
        onDelete: 'CASCADE',
        references: {
          model: "banners",
          key: "id",
        },
      },

      locale: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      sub_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },

    }),

  down: (queryInterface) => queryInterface.dropTable("banner_translation"),
};
