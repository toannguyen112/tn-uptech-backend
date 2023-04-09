export class RoleDTO {
    static transform = (item) => {
        return {
            id: item.id,
            name: item.name || "",
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }
    }

    static transformDetail = (item) => {
        return {
            id: item.id,
            name: item.name || "",
            permissions: item.permissions || []
        }
    }
}