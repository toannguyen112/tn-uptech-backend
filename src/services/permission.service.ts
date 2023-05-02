import { ApiFeatures } from "../utils/ApiFeatures";
import { Op } from "sequelize";
import { logger } from "../utils/logger";

import models from "../infra/sequelize/models";

export class PermissionService {

    public getList = async (query) => {
        try {
            const conditions = {};
            const queryObject = {
                status: query.status,
                search: query.search,
            };

            const excludedFields = ["page", "page_size", "sort_field", "sort_order", "fields"];
            excludedFields.forEach((field) => delete queryObject[field]);

            const arrQueryObject = Object.entries(queryObject).map((item) => {
                return {
                    key: item[0],
                    value: item[1],
                };
            });

            for (let index = 0; index < arrQueryObject.length; index++) {
                switch (arrQueryObject[index].key) {
                    case "status":
                        const status = typeof arrQueryObject[index].value === "string" ?
                            [arrQueryObject[index].value] : arrQueryObject[index].value;
                        if (Array.isArray(status)) {
                            conditions["status"] = {
                                [Op.in]: status.toString().split(','),
                            };
                        }
                        break;

                    default:
                        break;
                }
            }

            const objQuery = new ApiFeatures(query)
                .filter(conditions)
                .sort(query.sort_field || "createdAt", query.sort_order || "DESC")
                .paginate()
                .paranoid()
                .getObjQuery();

            const { count, rows }: any = await models.Permission.findAndCountAll(objQuery);

            const result = {
                page: Number(query?.page) * 1,
                pageSize: Number(query?.page_size) * 1,
                pageCount: Math.ceil(count / Number(query?.page_size) * 1),
                totalItems: count || 0,
                data: rows
            };

            return result;

        } catch (error) {
            console.log(error);
            logger.error(JSON.stringify(error));
        }
    }

    public update = async (id, body) => {

        const t = await models.sequelize.transaction();

        try {
            await models.Role.update({ name: body.name },
                { where: { id } },
                { transaction: t });

            await models.RolePermission.destroy({ where: { role_id: id } },
                { transaction: t });

            for await (const permission of body.permissions) {
                await models.RolePermission.create(
                    { role_id: id, permission_id: permission.id },
                    { transaction: t });
            }

            await t.commit();
        } catch (error) {
            console.log(error);
            await t.rollback();
        }
    }

    public delete = async (id) => {
        return await models.Permission.destroy({ where: { id } });
    }
}