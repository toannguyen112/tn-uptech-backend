"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("roles", [
      {
        id: 1,
        name: `Super Admin`,
      },
      {
        id: 2,
        name: `Editor`,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("roles", null, {})
  },
};
