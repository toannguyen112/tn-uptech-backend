"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("projects", [
      {
        id: 1,
        name: `Project 1`,
      },
      {
        id: 2,
        name: `Project 1`,
      },
      {
        id: 3,
        name: `Project 1`,
      },
      {
        id: 4,
        name: `Project 1`,
      },
      {
        id: 5,
        name: `Project 1`,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("projects", null, {});
  },
};
