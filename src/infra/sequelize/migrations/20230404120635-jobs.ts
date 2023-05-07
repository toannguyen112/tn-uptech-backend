"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("jobs", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      ceo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "ceos",
          key: "id",
        },
        allowNull: true,
        onDelete: 'SET NULL',
      },

      related: {
        type: Sequelize.JSON,
        defaultValue: [],
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

      view: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },

      expried_date: {
        type: Sequelize.DATE,
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },

      deletedAt: {
        type: Sequelize.DATE, allowNull: true,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("jobs"),
};
