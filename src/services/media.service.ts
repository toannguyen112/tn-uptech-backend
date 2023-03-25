import models from "../infra/sequelize/models";
import { Media } from "../interface/media.interface";
import { Service } from 'typedi';

@Service()
export class MediaService {
    public async index(): Promise<Media[]> {
        return await models.Media.findAll({})
    }

    public async create(body): Promise<Media> {
        return await models.Media.create({ ...body });
    }

    public async delete(id): Promise<Media> {
        return await models.Media.destroy({ where: { id } });
    }
}