import Helper from "../utils/Helper";

export class CeoDTO {
    static transform = (item) => {

        if (!item.translations.length) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            title: translationData.title || "",
            name: translationData.name || "",
            slug: translationData.slug || "",
            status: item.status || 'inactive',
            thumbnail: item.image,

            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }

    }

    static transformClient = (item: any) => {

        if (!item.translations.length) return {};

        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            slug: translationData.slug || "",
        }

    }

    static transformDetail = (item) => {

        if (!item) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            title: translationData.title || "",
            description: translationData.description || "",
            detail: translationData.detail || "",
            date: translationData.date || "",
            phone: translationData.phone || "",
            email: translationData.email || "",
            position: translationData.position || "",
            work_at: translationData.work_at || "",
            lang: translationData.lang || "",
            address: translationData.address || "",
            social: translationData.social || "",
            education: translationData.education || "",

            status: item.status || 'inactive',
            thumbnail: item.image ? item.image : null,

            ...Helper.FieldsSeo(translationData),
        }
    }
}