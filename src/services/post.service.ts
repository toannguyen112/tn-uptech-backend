import models from "../infra/sequelize/models";
import { Service } from 'typedi';
import { ApiFeatures } from "../utils/ApiFeatures";

@Service()
export class PostService {

    public getList = async (query) => {

        const conditions = {};
        const objQuery = new ApiFeatures(query)
            .filter(conditions)
            .paginate()
            .paranoid()
            .getObjQuery();

        const { count, rows }: any = await models.Post.findAndCountAll(objQuery);

        const result = {
            page: Number(query?.page) * 1,
            pageSize: Number(query?.page_size) * 1,
            pageCount: Math.ceil(count / Number(query?.page_size) * 1),
            totalItems: count || 0,
            data: rows,
        };

        return result;
    }

    public create = async (body) => {
        return await models.Post.create({ ...body });
    }

    public show = async (id) => {
        return await models.Post.findOne({ where: { id } });
    }

    public update = async (id, body) => {
        const data = await models.Post.update(body, { where: { id } });
    }

    public delete = async (id) => {
        return await models.Post.destroy({ where: { id } });
    }
}