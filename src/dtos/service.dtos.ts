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
            description: translationData.description || "",

            isFeatured: item.isFeatured || "",
            thumbnail: item.image,

            section_1: translationData.section_1 || "",
            section_2: translationData.section_2 || "",
            section_3: translationData.section_3 || "",
            section_4: translationData.section_4 || "",

            ...Helper.FieldsSeo(translationData)
        }
    }
}