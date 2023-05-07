export class CategoryDTO {
    static transform = (item) => {

        if (!item.translations.length) return {};

        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            description: translationData.description || "",
            slug: item.slug || "",
            status: item.status,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }

    }
}