"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("contacts", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      name: {
        type: Sequelize.STRING,
      },

      email: {
        type: Sequelize.STRING,
      },

      phone: {
        type: Sequelize.STRING,
      },

      note: {
        type: Sequelize.STRING,
      },

      type: {
        type: Sequelize.STRING,
      },

      status: {
        type: Sequelize.STRING,
        defaultValue: "new"
      },

      file_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: "medias",
          key: "id",
        },
        allowNull: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("contacts"),
};
