"use strict";
module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.bulkInsert("permissions", [
        {
          id: 1,
          name: "Tổng quan"
        },
        {
          id: 2,
          name: "Bài viết"
        },
        {
          id: 3,
          name: "Dự án"
        },
        {
          id: 4,
          name: "Ceo"
        },
        {
          id: 5,
          name: "Quản lí file"
        },
        {
          id: 6,
          name: "Tuyển dụng"
        },
        {
          id: 7,
          name: "Danh mục"
        },
        {
          id: 8,
          name: "Banner"
        },
        {
          id: 9,
          name: "Vai trò"
        },
        {
          id: 10,
          name: "Tài khoản"
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
