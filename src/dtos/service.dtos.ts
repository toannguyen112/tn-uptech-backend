import Helper from "../utils/Helper";

export class ServiceDTO {
    static transform = (item) => {

        if (!item.translations.length) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            slug: translationData.slug || "",
            description: translationData.description || "",
        }
    }

    static transformDetail = (item) => {

        if (!item) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            layout_number: item.layout_number || 3,
            description: translationData.description || "",

            isFeatured: item.isFeatured || false,
            thumbnail: item.image,

            section_1: translationData.section_1 || null,
            section_2: translationData.section_2 || null,
            section_3: translationData.section_3 || null,
            section_4: translationData.section_4 || null,
            section_5: translationData.section_5 || null,

            ...Helper.FieldsSeo(translationData)
        }
    }
}