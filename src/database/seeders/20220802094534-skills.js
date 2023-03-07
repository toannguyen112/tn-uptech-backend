"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("skills", [
      {
        id: 1,
        name: `Html`,
        star: 5,
      },
      {
        id: 2,
        name: `Css/Scss`,
        star: 5,
      },
      {
        id: 3,
        name: `Node Js`,
        star: 5,
      },
      {
        id: 4,
        name: `Laravel`,
        star: 5,
      },
      {
        id: 5,
        name: `Vue/NuxtJs`,
        star: 5,
      },
      {
        id: 6,
        name: `React/NextJs`,
        star: 5,
      },
      {
        id: 7,
        name: `React Native`,
        star: 5,
      },
      {
        id: 8,
        name: `DevOp/Aws`,
        star: 5,
      },
      {
        id: 9,
        name: `Docker`,
        star: 5,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("skills", null, {});
  },
};
