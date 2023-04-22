"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("project_branchs", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: "projects",
          key: "id",
        },
      },

      branch_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: "branchs",
          key: "id",
        },
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("project_branchs"),
};
