import Helper from "../utils/Helper";

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

        return [
            {
                key: item.id,
                label: translationData.name || "",
                children: item.children.map((item) => {
                    return {
                        key: item.id,
                        label: item.translations[0].name,
                        slug: item.translations[0].slug,
                        ...Helper.FieldsSeo(item.translations[0])
                    }
                }),
                ...Helper.FieldsSeo(translationData)
            }
        ]
    }
}