"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("admin_roles", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
      },

      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("admin_roles"),
};
