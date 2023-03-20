"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("posts", [
      {
        id: 1,
        name: `Post 1`,
        content: "alo alo",
        status: `active`,
        description: 'Description 1'
      },
      {
        id: 2,
        name: `Post 2`,
        content: "alo alo",
        status: `active`,
        description: 'Description 2'
      },
      {
        id: 3,
        name: `Post 3`,
        content: "alo alo",
        status: `inactive`,
        description: 'Description 3'
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
