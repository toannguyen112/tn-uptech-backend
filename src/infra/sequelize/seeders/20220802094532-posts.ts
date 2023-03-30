"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("posts", [
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
    await queryInterface.bulkDelete("posts", null, {});
  },
};
