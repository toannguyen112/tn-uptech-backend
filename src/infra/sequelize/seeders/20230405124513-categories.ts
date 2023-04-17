"use strict";
module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.bulkInsert("categories", [
        {
          id: 1,
          status: `active`,
        },
        {
          id: 2,
          status: `active`,
        },
      ]);

      await queryInterface.bulkInsert("category_translation", [
        {
          id: 1,
          name: `Website`,
          slug: `website`,
          category_id: 1,
          locale: `vi`,
        },
        {
          id: 2,
          name: `Website`,
          slug: `website`,
          category_id: 1,
          locale: `en`,
        },
        {
          id: 3,
          name: `Ứng dụng di động`,
          slug: `android`,
          category_id: 2,
          locale: `vi`,
        },
        {
          id: 4,
          name: `Android`,
          slug: `android`,
          category_id: 2,
          locale: `en`,
        },
      ]);
    } catch (error) {
      console.log(error);
    }

  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("categories", null, {});
    await queryInterface.bulkDelete("category_translation", null, {});
  },
};
