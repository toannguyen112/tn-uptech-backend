"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("branch_translation", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      branch_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "branchs",
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

    }),

  down: (queryInterface) => queryInterface.dropTable("branch_translation"),
};
