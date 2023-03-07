"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("contacts", [
      {
        id: 1,
        data: `contact 1`,
      },
      {
        id: 2,
        data: `contact 2`,
      },
      {
        id: 3,
        data: `contact 3`,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("contacts", null, {});
  },
};
