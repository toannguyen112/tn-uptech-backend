import models from "../infra/sequelize/models";
import { Folder } from "../interface/folder.interface";
import { Service } from 'typedi';

@Service()
export class FolderService {
    public async index(): Promise<Folder[]> {
        return await models.Folder.findAll({
            attributes: [
                ['id', 'key'],
                ['label', 'label'],
                'icon',
                'path',
            ],
            where: { parent_id: 0 },
            include: {
                model: models.Folder,
                as: "children",
                include: {
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
}