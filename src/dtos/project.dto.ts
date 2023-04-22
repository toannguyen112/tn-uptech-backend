export class ProjectDTO {
    static transform = (item) => {

        if (!item.translations.length) return {};

        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            slug: item.slug || "",
            description: translationData.description || "",
            isFeatured: item.isFeatured ? "Hoạt động" : "Ẩn",
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
            description: translationData.description || "",
            isFeatured: item.isFeatured || false,
            status: item.status || 'inactive',
            content: translationData.content || "",
            thumbnail: item.image || null,
            banner: item.banner_image || null,
            related: item.related || [],

            branchs: item.branchs.map((item)=>{
                return item.id
            }) || [],

            services: item.services.map((item)=>{
                return item.id
            }) || [],

            // seo 

            slug: translationData.slug || "",
            custom_slug: translationData.custom_slug || "",
            meta_title: translationData.meta_title || "",
            meta_description: translationData.meta_description || "",
            meta_keyword: translationData.meta_keyword || "",
            meta_robots: translationData.meta_robots || "",
            canonica_link: translationData.canonica_link || "",
            meta_image: translationData.meta_image || "",
            meta_viewport: translationData.meta_viewport || "",

            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }
    }
}