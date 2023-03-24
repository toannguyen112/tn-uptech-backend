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
            where: {
                $or: [
                    {
                        parent_id:
                        {
                            $eq: 0
                        }
                    },
                    {
                        parent_id:
                        {
                            $eq: null
                        }
                    },
                ],

            },
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

    public async create(body): Promise<Folder> {
        return await models.Folder.create({ ...body });
    }

    public async delete(id): Promise<Folder> {
        return await models.Folder.destroy({ where: { id } });
    }
}