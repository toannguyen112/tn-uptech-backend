"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("projects", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      file_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "files",
          key: "id",
        },
      },

      name: {
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
        defaultValue: 'active'
      },

      content: {
        type: Sequelize.STRING,
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

  down: (queryInterface) => queryInterface.dropTable("projects"),
};
