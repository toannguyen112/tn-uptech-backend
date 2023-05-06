import Helper from "../utils/Helper";
export class PostDTO {
    static transform = (item: any) => {

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
            posted_at: item.posted_at || null,
            status: item.status || 'inactive',
            content: translationData.content || "",
            thumbnail: item.image || null,
            banner: item.banner_image || null,
            related: item.related || [],

            ...Helper.FieldsSeo(translationData),

        }
    }

    static transformDetailClient = (item) => {

        if (!item) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            ceo: item.ceo ? {
                id: item.ceo.id,
                name: item.ceo['translations'][0].name || "",
                description: item.ceo['translations'][0].description || "",
                slug: item.ceo['translations'][0].slug || "",
                thumbnail: item.ceo.image ?? null,
            } : null,

            content: translationData.content || "",
            banner: item.banner_image || null,
            posted_at: item.posted_at,

            related: item.postRelated.map((item) => {
                return {
                    id: item.id,
                    name: item.translations[0].name,
                    category_slug: item.category ? item.category.translations[0].slug : "",
                    slug: item.translations[0].slug,
                    thumbnail: item.image ?? null,
                }
            }) || [],

            posts: item.posts.map((item) => {
                return {
                    id: item.id,
                    name: item.translations[0].name,
                    category_slug: item.category ? item.category.translations[0].slug : "",
                    slug: item.translations[0].slug,
                    thumbnail: item.image ?? null,
                }
            }) || [],

            ...Helper.FieldsSeo(translationData),

        }
    }
}