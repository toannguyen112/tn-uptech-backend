import { RoleDTO } from "../dtos/role.dtos";
import models from "../infra/sequelize/models";
import { ApiFeatures } from "../utils/ApiFeatures";

export class RoleService {

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
            console.log(error);
        }
    }

    public store = async (body) => {

        const t = await models.sequelize.transaction();

        try {
            await models.Role.create({ ...body }
                , { transaction: t })
                .then(async (role) => {
                    for (const permission of body.permissions) {
                        try {
                            await models.RolePermission.create({
                                role_id: role.id,
                                permission_id: permission.id,

                            },
                                { transaction: t });
                        } catch (error) {
                            console.log(error);
                            await t.rollback();
                        }
                    }
                });

            await t.commit();
        } catch (error) {
            console.log(error);
            await t.rollback();
        }
    }

    public findById = async (id) => {
        const role = await models.Role.findOne({
            where: { id },
            include: [
                {
                    model: models.Permission,
                    as: "permissions",
                    required: false,
                },
            ]
        });

        return RoleDTO.transformDetail(role);

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
        return await models.Role.destroy({ where: { id } });
    }
}