"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("post_categories", {
      post_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "posts",
          key: "id",
        },
      },

      category_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "categories",
          key: "id",
        },
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("post_categories"),
};
