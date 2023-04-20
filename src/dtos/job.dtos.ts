import Helper from "../utils/Helper";

export class JobDTO {
    static transform = (item) => {

        if (!item.translations.length) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            slug: translationData.slug || "",
            expried_date: item.expried_date ? Helper.formatDayJs(item.expried_date) : null,
            description: translationData.description || "",
            isFeatured: item.isFeatured,
            status: item.status,

            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }

    }

    static transformClient = (item) => {

        if (!item.translations.length) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            slug: translationData.slug || "",
            expried_date: item.expried_date ? Helper.formatDayJs(item.expried_date, "YYYY/MM/DD") : null,
            description: translationData.description || "",
            status: item.status,
            location: translationData.location,
            required: translationData.required || "",
            benefit: translationData.benefit || "",
        }

    }

    static transformDetail = (item) => {

        if (!item) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            description: translationData.description || "",
            required: translationData.required || "",
            isFeatured: item.isFeatured || false,
            address_work: translationData.address_work || "",
            location: translationData.location || "",
            view: item.view || 0,
            status: item.status || 'inactive',
            expried_date: item.expried_date ? Helper.formatDayJs(item.expried_date, "YYYY/MM/DD") : null,
            benefit: translationData.benefit || "",
            related: item.related || [],

            ...Helper.FieldsSeo(translationData)

        }
    }

    static transformDetailClient = (item) => {

        if (!item) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            description: translationData.description || "",
            required: translationData.required || "",
            isFeatured: item.isFeatured || false,
            address_work: translationData.address_work || "",
            location: translationData.location || "",
            view: item.view,
            status: item.status || 'inactive',
            expried_date: item.expried_date ? Helper.formatDayJs(item.expried_date, "YYYY/MM/DD") : null,
            benefit: translationData.benefit || "",
            
            related: item.jobRelated.map((item) => {
                return this.transformClient(item)
            }) || [],

            ...Helper.FieldsSeo(translationData)

        }
    }

    static transformDetailsClient = (item) => {

        if (!item) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            description: translationData.description || "",
            required: translationData.required || "",
            address_work: translationData.address_work || "",
            location: translationData.location || "",
            view: item.view || 0,
            status: item.status || 'inactive',
            expried_date: item.expried_date ? Helper.formatDayJs(item.expried_date, "YYYY/MM/DD") : null,
            benefit: translationData.benefit || "",

            ...Helper.FieldsSeo(translationData)

        }
    }

    static transformSave = (body) => {
        return {
            name: body.name,
            status: body.status,
            description: body.description,
            location: body.location,
            expried_date: body.expried_date,
            address_work: body.address_work,
            isFeatured: body.isFeatured,
            required: body.required,
            benefit: body.benefit,

            custom_slug: body.custom_slug,
            meta_title: body.meta_title,
            meta_description: body.meta_description,
            canonica_link: body.canonica_link,
            meta_robots: body.meta_robots,
            meta_image: body.meta_image,
            related: body.related,
            locale: body.locale,
        }
    }

}