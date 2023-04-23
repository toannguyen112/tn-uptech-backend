export class ServiceDTO {
    static transform = (item) => {

        if (!item.translations.length) return {};
        const translationData = item.translations[0];

        return {
            id: item.id,
            name: translationData.name || "",
            slug: translationData.slug || "",

            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }
    }

    static transformDetail = (item) => {

        if (!item) return {};
        const translationData = item.translations[0];

        return {
            key: item.id,
            label: translationData.name || "",
            children: item.children.map((item) => {
                return {
                    key: item.id,
                    label: item.translations[0].name,
                    slug: item.translations[0].slug,
                }
            }),

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