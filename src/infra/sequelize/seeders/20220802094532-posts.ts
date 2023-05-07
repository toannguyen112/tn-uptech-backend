"use strict";
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert("posts", [
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

        await queryInterface.bulkInsert("post_translation", [
            {
                id: 1,
                name: `Name Vi`,
                post_id: 1,
                locale: `vi`,
                content: "content vi",
                description: "description vi",
            },
            {
                id: 2,
                name: `Name En`,
                post_id: 1,
                locale: `en`,
                content: "content en",
                description: "description en",
            },
            {
                id: 3,
                name: `Name Vi`,
                post_id: 2,
                locale: `vi`,
                content: "content vi",
                description: "description vi",
            },
            {
                id: 4,
                name: `Name En`,
                post_id: 2,
                locale: `en`,
                content: "content en",
                description: "description en",
            },
        ]);

    },
    async down(queryInterface) {
        await queryInterface.bulkDelete("posts", null, {});
    },
};
