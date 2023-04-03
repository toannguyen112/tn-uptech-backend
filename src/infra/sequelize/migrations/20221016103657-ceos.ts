"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("ceos", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      slug: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      status: {
        type: Sequelize.STRING,
        defaultValue: "active"
      },

      thumbnail: {
        type: Sequelize.INTEGER,
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

  down: (queryInterface) => queryInterface.dropTable("ceos"),
};
