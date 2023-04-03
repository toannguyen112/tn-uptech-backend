export class CeoDTO {
    static transform = (item) => {

        if (!item.translations.length) return {};

        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            slug: item.slug || "",
            status: item.status || 'inactive',
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
            slug: translationData.slug || "",
            custom_slug: translationData.custom_slug || "",
            description: translationData.description || "",
            status: item.status || 'inactive',
            detail: translationData.detail || "",
            thumbnail: item.image || null,
            related: item.related || [],
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }
    }
}