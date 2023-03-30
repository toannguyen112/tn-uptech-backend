"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("projects", [
      {
        id: 1,
        status: `active`,
      },
      {
        id: 2,
        status: `active`,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("projects", null, {});
  },
};
