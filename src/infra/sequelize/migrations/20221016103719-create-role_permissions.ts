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
        references: {
          model: "roles",
          key: "id",
        },
      },

      permission_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: "permissions",
          key: "id",
        },
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("role_permissions"),
};
