"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("folders", [
      {
        id: 1,
        parent_id: 1,
        name: `File 1`,
      },
      {
        id: 2,
        parent_id: 1,
        name: `File 1`,
      },
      {
        id: 3,
        parent_id: 2,
        name: `File 1`,
      },
      {
        id: 4,
        parent_id: 2,
        name: `File 1`,
      },
      {
        id: 5,
        parent_id: 2,
        name: `File 1`,
      },
      {
        id: 6,
        parent_id: 1,
        name: `File 1`,
      },
      {
        id: 7,
        parent_id: 6,
        name: `File 1`,
      },
      {
        id: 8,
        parent_id: 7,
        name: `File 1`,
      },
      {
        id: 9,
        parent_id: 6,
        name: `File 1`,
      },
      {
        id: 10,
        parent_id: 6,
        name: `File 1`,
      },
      {
        id: 11,
        parent_id: 5,
        name: `File 1`,
      },
      {
        id: 12,
        parent_id: 5,
        name: `File 1`,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("folders", null, {});
  },
};
