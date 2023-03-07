"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("courses", [
      {
        id: 1,
        name: `courses 1`,
      },
      {
        id: 2,
        name: `courses 2`,
      },
      {
        id: 3,
        name: `courses 3`,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("courses", null, {});
  },
};
