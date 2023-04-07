import models from "../infra/sequelize/models";
import { ApiFeatures } from "../utils/ApiFeatures";

export class AdminService {

    public getList = async (query) => {
        try {

            const conditions = {};
            const queryObject = { search: query.search };

            const excludedFields = ["page", "page_size", "sort_field", "sort_order", "fields"];

            excludedFields.forEach((field) => delete queryObject[field]);

            const objQuery = new ApiFeatures(query)
                .filter(conditions)
                .sort(query.sort_field || "createdAt", query.sort_order || "DESC")
                .paginate()
                .paranoid()
                .getObjQuery();

            const { count, rows }: any = await models.Admin.findAndCountAll(objQuery);

            const result = {
                page: Number(query?.page) * 1,
                pageSize: Number(query?.page_size) * 1,
                pageCount: Math.ceil(count / Number(query?.page_size) * 1),
                totalItems: count || 0,
                data: rows,
            };

            return result;
        } catch (error) {
            console.log(error);
        }
    }

    public store = async (body) => {
        return await models.Admin.create({ ...body });
    }

    public findById = async (id) => {
        return await models.Admin.findOne({ where: { id } });
    }

    public update = async (id, body) => {
        return await models.Admin.update({ ...body }, { where: { id } });
    }

    public deleteById = async (id) => {
        return await models.Admin.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids) => {
        return await models.Admin.destroy({ where: { id: ids } });
    }

}