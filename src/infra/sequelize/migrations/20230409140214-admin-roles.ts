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
        references: {
          model: "admins",
          key: "id",
        },
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
    }),

  down: (queryInterface) => queryInterface.dropTable("admin_roles"),
};
