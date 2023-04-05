import { RoleDTO } from "../dtos/role.dtos";
import models from "../infra/sequelize/models";
import { ApiFeatures } from "../utils/ApiFeatures";
import { Op } from "sequelize";

export class RoleService {

    public getList = async (query) => {
        try {

            const conditions = {};

            const queryObject = {
                search: query.search,
            };

            const excludedFields = ["page", "page_size", "sort_field", "sort_order", "fields"];

            excludedFields.forEach((field) => delete queryObject[field]);

            const objQuery = new ApiFeatures(query)
                .filter(conditions)
                .sort(query.sort_field || "createdAt", query.sort_order || "DESC")
                .paginate()
                .paranoid()
                .getObjQuery();

            const { count, rows }: any = await models.Role.findAndCountAll(objQuery);

            const result = {
                page: Number(query?.page) * 1,
                pageSize: Number(query?.page_size) * 1,
                pageCount: Math.ceil(count / Number(query?.page_size) * 1),
                totalItems: count || 0,
                data: rows.map((item: any) => RoleDTO.transform(item)),
            };

            return result;
        } catch (error) {
            console.log(error.message);
        }
    }

    public store = async (body) => {
        return await models.Role.create({ ...body })
    }

    public findById = async (id) => {
        return await models.Role.findOne({ where: { id } });
    }

    public update = async (id, body) => {
        return await models.Role.update({ ...body }, { where: { id } });
    }

    public delete = async (id) => {
        return await models.Role.destroy({ where: { id } });
    }
}