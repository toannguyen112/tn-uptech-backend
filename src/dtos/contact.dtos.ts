export class ContactDTO {
    static transform = (item) => {

        return {
            id: item.id,
            name: item.name || "",
            status: item.status,
            
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }
    }

    static transformDetail = (item) => {
        return {
            id: item.id,
            name: item.name || "",
            status: item.status,
            file: item.file,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }
    }
}