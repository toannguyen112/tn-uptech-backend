export class JobDTO {
    static transform = (item) => {

        return {
            id: item.id,
            name: item.name || "",
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }

    }

}