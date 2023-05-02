import Helper from "../utils/Helper";

export class ServiceDTO {
    static transform = (item) => {

        if (!item.translations.length) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            slug: translationData.slug || "",

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
            isFeatured: item.isFeatured || "",
            description: translationData.description || "",
            thumbnail: item.image,

            ...Helper.FieldsSeo(translationData)
        }
    }
}