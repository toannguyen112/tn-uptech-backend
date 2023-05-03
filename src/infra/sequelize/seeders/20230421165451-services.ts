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
        // slug: Helper.renderSlug(`Digital product design & development`),
        service_id: 1,
        locale: `en`,
      },
      {
        id: 3,
        name: `Tư vấn và phát triển doanh nghiệp`,
        // slug: Helper.renderSlug(`Tư vấn và phát triển doanh nghiệp`),
        service_id: 2,
        locale: `vi`,
      },

      {
        id: 4,
        name: `Consulting and business development`,
        // slug: Helper.renderSlug(`Consulting and business development`),
        service_id: 2,
        locale: `en`,
      },

      {
        id: 5,
        name: `Giải pháp nhân sự thông minh`,
        // slug: Helper.renderSlug(`Giải pháp nhân sự thông minh`),
        service_id: 3,
        locale: `vi`,
      },

      {
        id: 6,
        name: `Smart HR solution`,
        // slug: Helper.renderSlug(`Smart HR solution`),
        service_id: 3,
        locale: `en`,
      },

      // chidren parent id 1

      {
        id: 7,
        name: `Website`,
        // slug: Helper.renderSlug(`Website`),
        service_id: 4,
        locale: `vi`,
      },

      {
        id: 8,
        name: `Website`,
        // slug: Helper.renderSlug(`website`),
        service_id: 4,
        locale: `en`,
      },

      {
        id: 9,
        name: `Ứng dụng di động`,
        // slug: Helper.renderSlug(`Ứng dụng di động`),
        service_id: 5,
        locale: `vi`,
      },

      {
        id: 10,
        name: `Mobile app`,
        // slug: Helper.renderSlug(`Mobile app`),
        service_id: 5,
        locale: `en`,
      },

      {
        id: 11,
        name: `Mô hình & chiến lược chuyển đổi số`,
        // slug: Helper.renderSlug(`Mô hình & chiến lược chuyển đổi số`),
        service_id: 7,
        locale: `vi`,
      },

      {
        id: 12,
        name: `Models & strategies for digital transformation`,
        // slug: Helper.renderSlug(`Models & strategies for digital transformation`),
        service_id: 7,
        locale: `en`,
      },

      {
        id: 13,
        name: `ERP`,
        // slug: Helper.renderSlug(`ERP`),
        service_id: 8,
        locale: `vi`,
      },

      {
        id: 14,
        name: `ERP`,
        // slug: Helper.renderSlug(`ERP`),
        service_id: 8,
        locale: `en`,
      },


      {
        id: 15,
        name: `Cho thuê nhận sự IT`,
        // slug: Helper.renderSlug(`Cho thuê nhận sự IT`),
        service_id: 10,
        locale: `vi`,
      },

      {
        id: 16,
        name: `Hire to receive IT`,
        // slug: Helper.renderSlug(`Hire to receive IT`),
        service_id: 10,
        locale: `en`,
      },


    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("services", null, {});
    await queryInterface.bulkDelete("service_translation", null, {});
  },
};
