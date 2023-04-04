export class PostDTO {
    static transform = (item) => {

        if (!item.translations.length) return {};

        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            slug: item.slug || "",
            description: translationData.description || "",
            isFeatured: item.isFeatured,
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
            slug: translationData.slug || "",
            custom_slug: translationData.custom_slug || "",
            description: translationData.description || "",
            isFeatured: item.isFeatured || false,
            status: item.status || 'inactive',
            content: translationData.content || "",
            ceo: item.ceo.translations[0] || {},
            thumbnail: item.image || null,
            banner: item.banner_image || null,
            related: item.related || [],
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }
    }
}