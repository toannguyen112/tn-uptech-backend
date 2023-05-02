export class BannerDTO {
    static transform = (item) => {

        if (!item.translations.length) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            status: item.status,
            sub_name: translationData.sub_name || "",
            type: translationData.type || "",
            description: translationData.description || "",
            thumbnail: item.image || null,
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
            sub_name: translationData.sub_name || "",
            type: translationData.type || "",
            description: translationData.description || "",
            
            thumbnail: item.image || null,
            status: item.status,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }
    }
}