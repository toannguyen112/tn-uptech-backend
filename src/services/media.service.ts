import models from "../infra/sequelize/models";
import { Media } from "../interface/media.interface";

export class MediaService {
    public async getList(): Promise<Media[]> {
        return await models.Media.findAll({})
    }

    public async storeImage(
        image: any,
        folder: number = 0,
        uploads: string = "uploads",
        disk: string = "storage",
    ): Promise<Media> {
        const path = `/${uploads}/${image.filename}`;
        const diskPath = disk;

        const file = {
            filename: image.filename,
            disk: diskPath,
            folder_id: folder,
            path,
            extension: "",
            mime: image.mimetype,
            width: 0,
            height: 0,
            size: image.size,
        };

        return await models.Media.create(file);
    }

    public async delete(id): Promise<Media> {
        return await models.Media.destroy({ where: { id } });
    }
}