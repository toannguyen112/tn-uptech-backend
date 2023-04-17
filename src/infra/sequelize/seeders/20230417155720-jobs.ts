"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("jobs", [
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

    await queryInterface.bulkInsert("job_translation", [
      {
        id: 1,
        name: `Nhân viên kinh doanh`,
        job_id: 1,
        slug: `name-test-1-vi`,
        locale: `vi`,
        benefit: "Competitive salary. Performance-based award",
        required: "Tham mưu, đề xuất cho Tổng giám đốc các vấn đề thuộc lĩnh vực nhân sự như: xây dựng cơ cấu tổ chức, điều hành của công ty, công tác đào tạo tuyển dụng, các phương án về lương bổng, khen thưởng các chế độ phúc lợi cho người lao động,…",
        description: "As an Event Marketing Specialist, you will be part of our Marketing & Sales practice. This position is open for people living in Vietnam and abroad, equipped with applicable skills, and seeking opportunities to work in the Consulting industry at FPT Digital, Vietnam.",
      },
      {
        id: 2,
        name: `Business man`,
        job_id: 1,
        slug: `name-test-1-en`,
        locale: `en`,
        benefit: "Competitive salary. Performance-based award",
        required: "Tham mưu, đề xuất cho Tổng giám đốc các vấn đề thuộc lĩnh vực nhân sự như: xây dựng cơ cấu tổ chức, điều hành của công ty, công tác đào tạo tuyển dụng, các phương án về lương bổng, khen thưởng các chế độ phúc lợi cho người lao động,…",
        description: "As an Event Marketing Specialist, you will be part of our Marketing & Sales practice. This position is open for people living in Vietnam and abroad, equipped with applicable skills, and seeking opportunities to work in the Consulting industry at FPT Digital, Vietnam. en",
      },
      {
        id: 3,
        name: `Nhân viên kinh doanh`,
        job_id: 2,
        slug: `name-test-2-vi`,
        locale: `vi`,
        benefit: "International, dynamic, friendly working environment",
        required: "Tham mưu, đề xuất cho Tổng giám đốc các vấn đề thuộc lĩnh vực nhân sự như: xây dựng cơ cấu tổ chức, điều hành của công ty, công tác đào tạo tuyển dụng, các phương án về lương bổng, khen thưởng các chế độ phúc lợi cho người lao động,…",
        description: "As an Event Marketing Specialist, you will be part of our Marketing & Sales practice. This position is open for people living in Vietnam and abroad, equipped with applicable skills, and seeking opportunities to work in the Consulting industry at FPT Digital, Vietnam.",
      },
      {
        id: 4,
        name: `Business man`,
        job_id: 2,
        slug: `name-test-2-en`,
        locale: `en`,
        benefit: "Competitive salary. Performance-based award",
        required: "Tham mưu, đề xuất cho Tổng giám đốc các vấn đề thuộc lĩnh vực nhân sự như: xây dựng cơ cấu tổ chức, điều hành của công ty, công tác đào tạo tuyển dụng, các phương án về lương bổng, khen thưởng các chế độ phúc lợi cho người lao động,…",
        description: "As an Event Marketing Specialist, you will be part of our Marketing & Sales practice. This position is open for people living in Vietnam and abroad, equipped with applicable skills, and seeking opportunities to work in the Consulting industry at FPT Digital, Vietnam. en",
      },
    ]);

  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("jobs", null, {});
    await queryInterface.bulkDelete("job_translation", null, {});
  },
};
