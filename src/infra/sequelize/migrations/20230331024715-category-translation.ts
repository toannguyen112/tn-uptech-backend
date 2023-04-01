"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("category_transaction", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },

      name: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      description: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      slug: {
        allowNull: true,
        type: Sequelize.STRING,
      },

    }),

  down: (queryInterface) => queryInterface.dropTable("category_transaction"),
};
