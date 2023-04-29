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

    static transformDetail = (item) => {

        if (!item) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            description: translationData.description || "",
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
}