"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("services", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      thumbnail: {
        type: Sequelize.INTEGER,
        references: {
          model: "medias",
          key: "id",
        },
        allowNull: true,
        onDelete: 'SET NULL',
      },

      parent_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },

      layout_number: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },

      isFeatured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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

  down: (queryInterface) => queryInterface.dropTable("services"),
};
