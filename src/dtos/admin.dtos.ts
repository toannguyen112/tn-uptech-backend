export class AdminDTO {
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
            username: item.name || "",
            password: item.password || "",
            email: item.email || "",
            roles: item.roles.map((item) => item.id) || [],
        }
    }

}