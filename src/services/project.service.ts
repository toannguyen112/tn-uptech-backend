import models from "../infra/sequelize/models";
import { Service } from 'typedi';
import { ApiFeatures } from "../utils/ApiFeatures";
@Service()
export class ProjectService {

    public getList = async (query) => {
        const conditions = {};
        const objQuery = new ApiFeatures(query)
            .filter(conditions)
            .paginate()
            .paranoid()
            .getObjQuery();

        const { count, rows }: any = await models.Project.findAndCountAll(objQuery);

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

        return await models.Project.create(item);
    }

    public findById = async (id: string | number) => {
        return await models.Project.findOne({
            where: { id },
            include: [{
                model: models.Media,
                as: "image"
            },
            {
                model: models.Media,
                as: "banner_image"
            }]
        });
    }

    public updateById = async (id, body) => {
        const item = {
            ...body,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
            banner: body.banner ? body.banner.id : null,
        }
        return await models.Project.update(item, { where: { id } });
    }

    public deleteById = async (id) => {
        return await models.Project.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids) => {
        return await models.Project.destroy({ where: { id: ids } })
    }

}