"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("projects", [
      {
        id: 1,
        name: `Project 1`,
        description: `description`,
      },
      {
        id: 2,
        name: `Project 2`,
        description: `description`,
      },
      {
        id: 3,
        name: `Project 3`,
        description: `description`,
      },
      {
        id: 4,
        name: `Project 4`,
        description: `description`,
      },
      {
        id: 5,
        name: `Project 5`,
        description: `description`,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("projects", null, {});
  },
};
