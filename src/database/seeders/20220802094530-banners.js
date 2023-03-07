"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("banners", [
      {
        id: 1,
        name: `Banner 1`,
        status: ``,
      },
      {
        id: 2,
        name: `Banner 2`,
        status: ``,
      },
      {
        id: 3,
        name: `Banner 3`,
        status: ``,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("banners", null, {});
  },
};
