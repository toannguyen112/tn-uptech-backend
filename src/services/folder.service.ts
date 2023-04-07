import models from "../infra/sequelize/models";
import { Folder } from "../interface/folder.interface";
import { Op } from "sequelize";
import { Media } from "../interface/media.interface";

export class FolderService {

    private attributes = [
        ['id', 'key'],
        ['label', 'label'],
        ['icon', 'icon'],
        ['path', 'path'],
    ]

    public async index(): Promise<Folder[]> {
        return await models.Folder.findAll({
            attributes: this.attributes,
            where: {
                [Op.or]: [
                    { parent_id: 0 },
                    { parent_id: null }]
            },
            include: {
                model: models.Folder,
                as: "children",
                attributes: this.attributes,
                include: {
                    attributes: this.attributes,
                    model: models.Folder,
                    as: "children",
                    include: {
                        model: models.Folder,
                        as: "children",
                    }
                }
            }
        })
    }

    public async getMedias(fodlerId: string | number): Promise<Media[]> {
        return await models.Media.findAll({ where: { folder_id: fodlerId } });
    }

    public async create(body): Promise<Folder> {
        return await models.Folder.create({ ...body });
    }

    public async delete(id): Promise<Folder> {
        return await models.Folder.destroy({ where: { id } });
    }
}