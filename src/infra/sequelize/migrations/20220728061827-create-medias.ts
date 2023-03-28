"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("medias", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      filename: {
        type: Sequelize.STRING,
      },

      // mediatableType: {
      //   type: Sequelize.STRING,
      //   defaultValue: 'media'
      // },

      project_id: {
        type: Sequelize.INTEGER,
      },

      post_id: {
        type: Sequelize.INTEGER,
      },

      disk: {
        type: Sequelize.STRING,
      },

      folder_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "folders",
          key: "id",
        },
      },

      path: {
        type: Sequelize.STRING,
      },

      extension: {
        type: Sequelize.STRING,
      },

      mime: {
        type: Sequelize.STRING,
      },

      size: {
        type: Sequelize.INTEGER,
      },

      width: {
        type: Sequelize.INTEGER,
      },

      height: {
        type: Sequelize.INTEGER,
      },

      alt: {
        type: Sequelize.STRING,
      },

      creator: {
        type: Sequelize.STRING,
      },

      editor: {
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

  down: (queryInterface) => queryInterface.dropTable("medias"),
};
