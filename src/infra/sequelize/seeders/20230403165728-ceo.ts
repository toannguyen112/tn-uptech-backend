"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("ceos", [
      {
        id: 1,
        status: `active`,
      },
      {
        id: 2,
        status: `active`,
      },
    ]);

    await queryInterface.bulkInsert("ceo_translation", [
      {
        id: 1,
        name: `Hứa Thiện Vương Vi`,
        date: "13/02/1980",
        phone: "0908 363 923",
        email: "thienvuong@canhcam.vn",
        position: "Vị trí công việc",
        work_at: "Công ty Thiết kế website - Cánh Cam",
        lang: "Tiếng Việt - Tiếng Anh",
        address: "TP. Hồ Chí Minh",
        social: "Facebook, Insstagram",
        education: "Phổ thông: Trường THPT Chuyên Trần Hưng Đạo Bình ThuậnĐại Học: Kinh tế TPHCM - Chuyên khoa tin học quản lý (thống kê toán tin học quản lý)",
        ceo_id: 1,
        locale: `vi`,
        description: "Đến năm 2030 Cánh Cam sẽ là đơn vị hàng đầu trong lĩnh vực thiết kế web và app trên nền web không chỉ tại thị trường VN mà các nước trên Khu vực; có thêm nhiều khách hàng tại các nước phát triển như Mỹ, Úc,... Là địa chỉ tin cậy mà Doanh nghiệp luôn nghĩ tới đầu tiên khi triển khai website.",
      },
      {
        id: 2,
        name: `Hứa Thiện Vương En`,
        date: "13/02/1980",
        phone: "0908 363 923",
        email: "thienvuong@canhcam.vn",
        position: "Vị trí công việc",
        work_at: "Công ty Thiết kế website - Cánh Cam",
        lang: "Tiếng Việt - Tiếng Anh",
        address: "TP. Hồ Chí Minh",
        social: "Facebook, Insstagram",
        education: "Phổ thông: Trường THPT Chuyên Trần Hưng Đạo Bình ThuậnĐại Học: Kinh tế TPHCM - Chuyên khoa tin học quản lý (thống kê toán tin học quản lý)",
        ceo_id: 1,
        locale: `en`,
        description: "Đến năm 2030 Cánh Cam sẽ là đơn vị hàng đầu trong lĩnh vực thiết kế web và app trên nền web không chỉ tại thị trường VN mà các nước trên Khu vực; có thêm nhiều khách hàng tại các nước phát triển như Mỹ, Úc,... Là địa chỉ tin cậy mà Doanh nghiệp luôn nghĩ tới đầu tiên khi triển khai website.",
      },
      {
        id: 3,
        name: `Hứa Thiện Vương Vi`,
        date: "13/02/1980",
        phone: "0908 363 923",
        email: "thienvuong@canhcam.vn",
        position: "Vị trí công việc",
        work_at: "Công ty Thiết kế website - Cánh Cam",
        lang: "Tiếng Việt - Tiếng Anh",
        address: "TP. Hồ Chí Minh",
        social: "Facebook, Insstagram",
        education: "Phổ thông: Trường THPT Chuyên Trần Hưng Đạo Bình ThuậnĐại Học: Kinh tế TPHCM - Chuyên khoa tin học quản lý (thống kê toán tin học quản lý)",
        ceo_id: 2,
        locale: `vi`,
        description: "Đến năm 2030 Cánh Cam sẽ là đơn vị hàng đầu trong lĩnh vực thiết kế web và app trên nền web không chỉ tại thị trường VN mà các nước trên Khu vực; có thêm nhiều khách hàng tại các nước phát triển như Mỹ, Úc,... Là địa chỉ tin cậy mà Doanh nghiệp luôn nghĩ tới đầu tiên khi triển khai website.",
      },
      {
        id: 4,
        name: `Hứa Thiện Vương En`,
        date: "13/02/1980",
        phone: "0908 363 923",
        email: "thienvuong@canhcam.vn",
        position: "Vị trí công việc",
        work_at: "Công ty Thiết kế website - Cánh Cam",
        lang: "Tiếng Việt - Tiếng Anh",
        address: "TP. Hồ Chí Minh",
        social: "Facebook, Insstagram",
        education: "Phổ thông: Trường THPT Chuyên Trần Hưng Đạo Bình ThuậnĐại Học: Kinh tế TPHCM - Chuyên khoa tin học quản lý (thống kê toán tin học quản lý)",
        ceo_id: 2,
        locale: `en`,
        description: "Đến năm 2030 Cánh Cam sẽ là đơn vị hàng đầu trong lĩnh vực thiết kế web và app trên nền web không chỉ tại thị trường VN mà các nước trên Khu vực; có thêm nhiều khách hàng tại các nước phát triển như Mỹ, Úc,... Là địa chỉ tin cậy mà Doanh nghiệp luôn nghĩ tới đầu tiên khi triển khai website.s",
      },
    ]);

  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("ceos", null, {});
    await queryInterface.bulkDelete("ceo_translation", null, {});
  },
};
