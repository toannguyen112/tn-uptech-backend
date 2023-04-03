export class BannerDTO {
    static transform = (item) => {

        if (!item.translations.length) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            status: item.status || 'inactive',
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
            description: translationData.description || "",
            status: item.status || 'inactive',
            sub_name: translationData.sub_name || '',
            content: translationData.content || "",
            thumbnail: item.image || null,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }
    }
}