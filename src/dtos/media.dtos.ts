
export class MediaDTO {
    static transform = (item: any) => {

        return {
            id: item.id,
            filename: item.filename,
            folder_id: item.folder_id,
            path: item.path,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }
    }
}