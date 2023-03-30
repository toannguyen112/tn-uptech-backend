export class ProjectDTO {
    static transform = (item) => {
        const translationData = item.translation[0];
        return {
            id: item.id,
            name: translationData.name || "",
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
        const translationData = item.translation[0];
        return {
            id: item.id,
            name: translationData.name || "",
            description: translationData.description || "",
            isFeatured: item.isFeatured,
            status: item.status,
            content: translationData.content || "",
            thumbnail: item.image,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }
    }
}