"use strict";
module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.bulkInsert("branchs", [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ]);

      await queryInterface.bulkInsert("branch_translation", [
        {
          id: 1,
          name: `Bán lẻ & Tiêu dùng`,
          branch_id: 1,
          locale: `vi`,
        },
        {
          id: 2,
          name: `Retail & Consumption`,
          branch_id: 1,
          locale: `en`,
        },
        {
          id: 3,
          name: `Bất động sản`,
          branch_id: 2,
          locale: `vi`,
        },
        {
          id: 4,
          name: `Real estate`,
          branch_id: 2,
          locale: `en`,
        },
      ]);
    } catch (error) {
      console.log(error);
    }

  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("branchs", null, {});
    await queryInterface.bulkDelete("branch_translation", null, {});
  },
};
