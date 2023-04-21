"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("services", [
      {
        id: 1,
        parent_id: 0,
      },
      {
        id: 2,
        parent_id: 0,
      },
      {
        id: 3,
        parent_id: 0,
      },

      {
        id: 4,
        parent_id: 1,
      },
      {
        id: 5,
        parent_id: 1,
      },
      {
        id: 6,
        parent_id: 1,
      },

      {
        id: 7,
        parent_id: 2,
      },
      {
        id: 8,
        parent_id: 2,
      },
      {
        id: 9,
        parent_id: 2,
      },


      {
        id: 10,
        parent_id: 3,
      },
      {
        id: 11,
        parent_id: 3,
      },
      {
        id: 12,
        parent_id: 3,
      },
    ]);

    await queryInterface.bulkInsert("service_translation", [
      {
        id: 1,
        name: `Thiết kế & phát triển sản phẩm số`,
        service_id: 1,
        locale: `vi`,
      },
      {
        id: 2,
        name: `Digital product design & development`,
        service_id: 1,
        locale: `en`,
      },
      {
        id: 3,
        name: `Tư vấn và phát triển doanh nghiệp`,
        service_id: 2,
        locale: `vi`,
      },

      {
        id: 4,
        name: `Consulting and business development`,
        service_id: 2,
        locale: `en`,
      },

      {
        id: 5,
        name: `Giải pháp nhân sự thông minh`,
        service_id: 3,
        locale: `vi`,
      },

      {
        id: 6,
        name: `Smart HR solution`,
        service_id: 3,
        locale: `en`,
      },

    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("services", null, {});
    await queryInterface.bulkDelete("service_translation", null, {});
  },
};
