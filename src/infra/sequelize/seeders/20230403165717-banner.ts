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
          name: `Thiết Kế Giải Pháp  công nghệ bền vững`,
          type: "Công nghệ số",
          sub_name: "Giải pháp toàn diện",
          banner_id: 1,
          locale: `vi`,
          description: "Chúng tôi hướng tới sự phát triển lâu dài của khách hàng với những giải pháp phù hợp và có khả năng mở rộng để đáp ứng nhu cầu tại mọi thời điểm.",
        },
        {
          id: 2,
          name: `Thiết Kế Giải Pháp  công nghệ bền vững En`,
          type: "Công nghệ số",
          banner_id: 1,
          locale: `en`,
          sub_name: "Giải pháp toàn diện En",
          description: "Chúng tôi hướng tới sự phát triển lâu dài của khách hàng với những giải pháp phù hợp và có khả năng mở rộng để đáp ứng nhu cầu tại mọi thời điểm.",
        },
        {
          id: 3,
          name: `Thiết Kế Giải Pháp  công nghệ bền vững`,
          type: "KINH DOANH SỐ",
          banner_id: 2,
          locale: `vi`,
          sub_name: "Tăng trưởng kinh doanh",
          description: "Chúng tôi hướng tới sự phát triển lâu dài của khách hàng với những giải pháp phù hợp và có khả năng mở rộng để đáp ứng nhu cầu tại mọi thời điểm.",
        },
        {
          id: 4,
          name: `Thiết Kế Giải Pháp  công nghệ bền vững En`,
          type: "KINH DOANH SỐ",
          banner_id: 2,
          locale: `en`,
          sub_name: "Tăng trưởng kinh doanh",
          description: "Chúng tôi hướng tới sự phát triển lâu dài của khách hàng với những giải pháp phù hợp và có khả năng mở rộng để đáp ứng nhu cầu tại mọi thời điểm.",
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
