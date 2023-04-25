"use strict";
module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.bulkInsert("permissions", [
        {
          id: 1,
          name: "Tổng quan",
          value: "dasboard",
        },
        {
          id: 2,
          name: "Bài viết",
          value: "posts",
        },
        {
          id: 3,
          name: "Dự án",
          value: "projects",
        },
        {
          id: 4,
          name: "Ceo",
          value: "ceos",
        },
        {
          id: 5,
          name: "Quản lí file",
          value: "files",
        },
        {
          id: 6,
          name: "Tuyển dụng",
          value: "jobs",
        },
        {
          id: 7,
          name: "Danh mục",
          value: "categories",
        },
        {
          id: 8,
          name: "Banner",
          value: "banners",
        },
        {
          id: 9,
          name: "Vai trò",
          value: "roles",
        },
        {
          id: 10,
          name: "Tài khoản",
          value: "accounts",
        },
        {
          id: 11,
          name: "Lĩnh vực",
          value: "branchs",
        },
        {
          id: 12,
          name: "Dịch vụ",
          value: "services",
        },
        {
          id: 13,
          name: "Liên hệ",
          value: "contacts",
        },
        {
          id: 14,
          name: "Ứng tuyển",
          value: "recruitments",
        },
      ]);

    } catch (error) {
      console.log(error);
    }

  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
