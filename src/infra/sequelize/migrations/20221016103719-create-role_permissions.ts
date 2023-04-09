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
        onDelete: 'CASCADE',
      },

      permission_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("role_permissions"),
};
