"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("folders", [
      {
        id: 1,
        parent_id: 0,
        label: `Folder Document`,
      },
      {
        id: 2,
        parent_id: 0,
        label: `Folder Media`,
      },
      {
        id: 3,
        parent_id: 1,
        label: `File 1`,
      },
      {
        id: 4,
        parent_id: 2,
        label: `File 1`,
      },
      {
        id: 5,
        parent_id: 2,
        label: `File 1`,
      },
      {
        id: 6,
        parent_id: 0,
        label: `Folder Project`,
      },
      {
        id: 7,
        parent_id: 6,
        label: `File 1`,
      },
      {
        id: 8,
        parent_id: 7,
        label: `File 1`,
      },
      {
        id: 9,
        parent_id: 6,
        label: `File 1`,
      },
      {
        id: 10,
        parent_id: 6,
        label: `File 1`,
      },
      {
        id: 11,
        parent_id: 5,
        label: `File 1`,
      },
      {
        id: 12,
        parent_id: 1,
        label: `File 1`,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("folders", null, {});
  },
};
