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
            username: item.username || "",
            password: item.password || "",
            email: item.email || "",
            roles: item.roles.map((item) => item.id) || [],
        }
    }

    static transformProfile = (item) => {
        const permissions = item.roles.map((item) => item.permissions.map((permission) => permission.value)) || [];
        const newArrayPer = Array.prototype.concat.apply([], permissions);
        let unique = [...new Set(newArrayPer)];

        return {
            id: item.id,
            name: item.name || "",
            username: item.username || "",
            password: item.password || "",
            email: item.email || "",
            permissions: unique
        }
    }

}