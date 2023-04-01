"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("projects", [
      {
        id: 1,
        status: `active`,
        isFeatured: true,
      },
      {
        id: 2,
        status: `active`,
        isFeatured: true,
      },
    ]);

    await queryInterface.bulkInsert("project_translation", [
      {
        id: 1,
        name: `Name Vi`,
        project_id: 1,
        slug: `name-test-vi`,
        locale: `vi`,
        content: "content vi",
        description: "description vi",
      },
      {
        id: 2,
        name: `Name En`,
        project_id: 2,
        slug: `name-test-en`,
        locale: `en`,
        content: "content en",
        description: "description en",
      },
    ]);

    await queryInterface.bulkInsert("project_related", [
      {
        id: 1,
        project_id: 1,
      },
      {
        id: 2,
        project_id: 2,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("projects", null, {});
  },
};
