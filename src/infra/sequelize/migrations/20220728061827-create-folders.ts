"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("folders", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      parent_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },

      hierarchyLevel: {
        type: Sequelize.INTEGER,
      },

      label: {
        type: Sequelize.STRING,
      },

      icon: {
        type: Sequelize.STRING,
        defaultValue: "pi pi-fw pi-cog"
      },

      path: {
        type: Sequelize.STRING,
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

  down: (queryInterface) => queryInterface.dropTable("folders"),
};
