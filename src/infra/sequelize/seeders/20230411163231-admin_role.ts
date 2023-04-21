"use strict";
module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.bulkInsert("admin_roles", [
        {
          id: 1,
          role_id: 1,
          admin_id: 1,
        },
        {
          id: 2,
          role_id: 2,
          admin_id: 1,
        },
      ]);

    } catch (error) {
      console.log(error);
    }

  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("admin_roles", null, {});
  },
};
