import Helper from "../utils/Helper";
import { MediaDTO } from "./media.dtos";
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
            thumbnail: item.image ? MediaDTO.transform(item.image) : null,
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
            posted_at: Helper.formatDayJs(item.posted_at) || null,
            update_at: Helper.formatDayJs(item.updatedAt) || null,
            status: item.status || 'inactive',
            content: translationData.content || "",
            thumbnail: item.image ? MediaDTO.transform(item.image) : null,
            banner: item.banner_image || null,
            related: item.related || [],
            ldjson: item.ldjson,

            fb: item.fb || "",
            linkedIn: item.linkedIn || "",
            twitter: item.twitter || "",
            dribbble: item.dribbble || "",
            orther_link: item.orther_link || "",

            ...Helper.FieldsSeo(translationData),

        }
    }

    static transformDetailClient = (item: any) => {

        if (!item) return {};
        const translationData = item.translations[0];
        return {
            id: item.dataValues.id || '',
            name: translationData.name || "",
            description: translationData.description || "",
            ceo: item.ceo ? {
                id: item.ceo.id,
                name: item.ceo['translations'][0].name || "",
                description: item.ceo['translations'][0].description || "",
                slug: item.ceo['translations'][0].slug || "",
                thumbnail: item.ceo.image ?? null,
            } : null,

            content: translationData.content || "",
            ldjson: item.ldjson,
            banner: item.banner_image || null,
            posted_at: Helper.formatDayJs(item.posted_at) || null,
            update_at: Helper.formatDayJs(item.updatedAt) || null,

            related: item.postRelated ? item.postRelated.map((item) => {
                return {
                    id: item.id,
                    name: item.translations[0].name,
                    category_slug: item.category ? item.category.translations[0].slug : "",
                    slug: item.translations[0].slug,
                    thumbnail: MediaDTO.transform(item.image) ?? null,
                }
            }) : [],

            posts: item.posts.map((item) => {
                return {
                    id: item.id,
                    name: item.translations[0].name,
                    description: item.translations[0].description,
                    category_slug: item.category ? item.category.translations[0].slug : "",
                    slug: item.translations[0].slug,
                    thumbnail: item.image ? MediaDTO.transform(item.image) : null,
                }
            }) || [],

            fb: item.fb || "",
            linkedIn: item.linkedIn || "",
            twitter: item.twitter || "",
            dribbble: item.dribbble || "",
            orther_link: item.orther_link || "",

            ...Helper.FieldsSeo(translationData),

        }
    }
}