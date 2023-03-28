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

    public findById = async (id: string | number) => {
        return await models.Project.findOne({ where: { id }, include: [models.Media] });
    }

    public updateById = async (id, body) => {
        return await models.Project.update(body, { where: { id } });
    }

    public deleteById = async (id) => {
        return await models.Project.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids) => {
        return await models.Project.destroy({ where: { id: ids } })
    }

}