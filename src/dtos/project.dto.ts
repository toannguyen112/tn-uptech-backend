import Helper from "../utils/Helper";

export class ProjectDTO {
    static transform = (item) => {

        if (!item.translations.length) return {};

        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            slug: translationData.slug || "",
            description: translationData.description || "",
            isFeatured: item.isFeatured ? "Hoạt động" : "Ẩn",
            status: item.status,
            content: translationData.content || "",
            thumbnail: item.image,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }

    }

    static transformClient = (item) => {

        if (!item) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            slug: translationData.slug || "",
            thumbnail: item.image ? item.image : null,

            services: item.services ? item.services.map((service) => {
                return {
                    name: service.translations[0].name,
                    slug: service.translations[0].slug,
                }
            }) : [],

        }
    }

    static transformDetail = (item) => {

        if (!item) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",

            description: translationData.description || "",
            work_item: translationData.work_item || [],

            isFeatured: item.isFeatured || false,
            status: item.status || 'inactive',
            content: translationData.content || "",
            thumbnail: item.image || null,
            banner: item.banner_image || null,
            related: item.related || [],

            section_1: translationData.section_1 || "",
            section_2: translationData.section_2 || "",
            section_3: translationData.section_3 || "",
            section_4: translationData.section_4 || "",
            section_5: translationData.section_5 || "",

            branchs: item.branchs.map((item) => {
                return item.id
            }) || [],

            services: item.services.map((item) => {
                return item.id
            }) || [],

            ...Helper.FieldsSeo(translationData),

        }
    }

    static transformDetailClient = (item) => {

        if (!item) return {};
        const translationData = item.translations[0];

        return {
            name: translationData.name || "",
            thumbnail: item.image || null,
            banner: item.banner_image || null,
            work_item: translationData.work_item || "",

            section_1: translationData.section_1 || "",
            section_2: translationData.section_2 || "",
            section_3: translationData.section_3 || "",
            section_4: translationData.section_4 || "",
            section_5: translationData.section_5 || "",

            branchs: item.branchs.map((item) => {
                return {
                    name: item.translations[0].name,
                }
            }) || [],

            services: item.services.map((item) => {
                return {
                    name: item.translations[0].name,
                    slug: item.translations[0].slug,
                }
            }) || [],

            related: item.related.length ? item.related.map((item) => {
                return {
                    id: item.id,
                    name: item.translations[0].name,
                    slug: item.translations[0].slug,
                    thumbnail: item.image,
                }
            }) : [],

            ...Helper.FieldsSeo(translationData),

        }
    }
}