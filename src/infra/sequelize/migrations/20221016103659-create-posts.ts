"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("posts", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      name: {
        type: Sequelize.STRING,
      },

      type: {
        type: Sequelize.STRING,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      isFeatured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      status: {
        type: Sequelize.STRING,
        defaultValue: "active"
      },

      content: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },

      file_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "files",
          key: "id",
        },
      },

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("posts"),
};
