"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("role_permissions", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      permission_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("role_permissions"),
};
