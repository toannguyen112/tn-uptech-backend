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
        slug: `name-test-1-vi`,
        locale: `vi`,
        content: "content vi",
        description: "description vi",
      },
      {
        id: 2,
        name: `Name En`,
        project_id: 1,
        slug: `name-test-1-en`,
        locale: `en`,
        content: "content en",
        description: "description en",
      },
      {
        id: 3,
        name: `Name Vi`,
        project_id: 2,
        slug: `name-test-2-vi`,
        locale: `vi`,
        content: "content vi",
        description: "description vi",
      },
      {
        id: 4,
        name: `Name En`,
        project_id: 2,
        slug: `name-test-2-en`,
        locale: `en`,
        content: "content en",
        description: "description en",
      },
    ]);

  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("projects", null, {});
    await queryInterface.bulkDelete("project_translation", null, {});
  },
};
