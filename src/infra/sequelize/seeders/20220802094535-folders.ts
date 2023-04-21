"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("folders", [
      {
        id: 1,
        parent_id: 0,
        label: `File Manager`,
      },
      {
        id: 2,
        parent_id: 0,
        label: `Folder Document`,
      },
      {
        id: 3,
        parent_id: 0,
        label: `Folder Media`,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("folders", null, {});
  },
};
