export class PostDTO {
    static transform = (item) => {

        let category = null;
        let category_name = "";
        let category_slug = "";

        if (!item.translations.length) return {};


        const translationData = item.translations[0];

        if (item.category && item.category.translations.length) {
            category = item.category.translations[0];
            category_name = category.name || "";
            category_slug = category.slug
        }

        return {
            id: item.id,
            name: translationData.name || "",
            category,
            category_name,
            category_slug,
            slug: translationData.slug || "",
            description: translationData.description || "",
            isFeatured: item.isFeatured,
            status: item.status,
            content: translationData.content || "",
            thumbnail: item.image || null,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }
    }

    static transformDetail = (item) => {

        if (!item) return {};
        const translationData = item.translations[0];
        const category = item.category ? item.category.translations[0] : null;

        return {
            id: item.id,
            name: translationData.name || "",
            ceo_id: item.ceo_id,

            category_id: item.category_id,
            category,

            description: translationData.description || "",
            isFeatured: item.isFeatured || false,
            status: item.status || 'inactive',
            content: translationData.content || "",
            thumbnail: item.image || null,
            banner: item.banner_image || null,
            related: item.related || [],

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

        }
    }
}