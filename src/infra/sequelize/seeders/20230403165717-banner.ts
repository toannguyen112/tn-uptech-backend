"use strict";
module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.bulkInsert("banners", [
        {
          id: 1,
          status: `active`,
        },
        {
          id: 2,
          status: `active`,
        },
      ]);

      await queryInterface.bulkInsert("banner_translation", [
        {
          id: 1,
          name: `Name Vi`,
          banner_id: 1,
          locale: `vi`,
          sub_name: "sub_name vi",
          desctiption: "desctiption vi",
        },
        {
          id: 2,
          name: `Name En`,
          banner_id: 1,
          locale: `en`,
          sub_name: "sub_name en",
          desctiption: "desctiption vi",
        },
        {
          id: 3,
          name: `Name Vi`,
          banner_id: 2,
          locale: `vi`,
          sub_name: "sub_name vi",
          desctiption: "desctiption vi",
        },
        {
          id: 4,
          name: `Name En`,
          banner_id: 2,
          locale: `en`,
          sub_name: "sub_name en",
          desctiption: "desctiption vi",
        },
      ]);
    } catch (error) {
      console.log(error);
    }

  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("banners", null, {});
    await queryInterface.bulkDelete("banner_translation", null, {});
  },
};
