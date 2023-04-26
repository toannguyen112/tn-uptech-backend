export class ContactDTO {
    static transform = (item) => {

        return {
            id: item.id,
            name: item.name || "",
            email: item.email || "",
            phone: item.phone || "",
            status: item.status,

            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }
    }

    static transformDetail = (item) => {
        return {
            id: item.id,
            name: item.name || "",
            email: item.email || "",
            phone: item.phone || "",
            note: item.note || "",
            status: item.status || "",
            file: item.file || null,
        }
    }
}