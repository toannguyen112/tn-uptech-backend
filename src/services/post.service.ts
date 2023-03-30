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

    public store = async (body) => {

        const item = {
            ...body,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
            banner: body.banner ? body.banner.id : null,
        }

        return await models.Post.create(item);
    }

    public show = async (id) => {
        return await models.Post.findOne({ where: { id } });
    }

    public update = async (id, body) => {

        const item = {
            ...body,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
            banner: body.banner ? body.banner.id : null,
        }
        return await models.Post.update(item, { where: { id } });
    }

    public delete = async (id) => {
        return await models.Post.destroy({ where: { id } });
    }
}