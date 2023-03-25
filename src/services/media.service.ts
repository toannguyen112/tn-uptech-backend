import models from "../infra/sequelize/models";
import { Media } from "../interface/media.interface";
import { Service } from 'typedi';

@Service()
export class MediaService {
    public async getList(): Promise<Media[]> {
        return await models.Media.findAll({})
    }

    public async storeImage(image: any, uploads: string = "uploads", disk: string = "storage"): Promise<Media> {
        const path = `/${uploads}/${image.filename}`;
        const diskPath = disk;

        const file = {
            filename: image.filename,
            disk: diskPath,
            fodler_id: 1,
            path,
            extension: "",
            mime: image.mimetype,
            width: 0,
            height: 0,
            size: image.size,
        };

        const data = await models.Media.findOne({ where: { filename: image.filename } });
        if (!data) return await models.Media.create(file);
        if (data) return data;
    }

    public async delete(id): Promise<Media> {
        return await models.Media.destroy({ where: { id } });
    }
}