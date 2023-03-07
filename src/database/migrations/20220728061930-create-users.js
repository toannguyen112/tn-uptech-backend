"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      admin_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "admins",
          key: "id",
        },
      },

      name: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      username: {
        type: Sequelize.STRING,
      },

      password: {
        type: Sequelize.STRING,
      },

      age: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },

      status: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: "INACTIVE"
      },

      tokens: {
        allowNull: true,
        type: Sequelize.JSON,
      },

      address: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      phone: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
