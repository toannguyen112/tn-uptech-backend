import { AdminDTO } from "../dtos/admin.dtos";
import models from "../infra/sequelize/models";
import { ApiFeatures } from "../utils/ApiFeatures";
import Helper from "../utils/Helper";
export class AdminService {

    public getList = async (query) => {
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
    }

    public login = async (body) => {
        const foundAdmin = await models.Admin.findOne({ where: { username: body.username } });

        if (!foundAdmin) {
            throw new Error("Name is not correct");
        }

        const isMatch: boolean = body.password === foundAdmin.password;

        if (isMatch) {

            const token = Helper.generateToken(foundAdmin, 'admin');

            return {
                data: foundAdmin,
                token,
            }
        }

        throw new Error("Password is not correct");
    }


    public create = async (body) => {

        const t = await models.sequelize.transaction();

        const newItem = {
            username: body.username,
            name: body.name,
            email: body.email,
            password: body.password,
        }

        try {
            await models.Admin.create(newItem,
                { transaction: t })
                .then(async (admin) => {
                    for (const roleId of body.roles) {
                        try {
                            await models.AdminRole.create({
                                role_id: Number(roleId),
                                admin_id: Number(admin.id),

                            }, { transaction: t });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    await t.commit();
                });
        } catch (error) {
            console.log(error);
            await t.rollback();
        }

    }

    public findById = async (id) => {
        const admin = await models.Admin.findOne({
            where: { id: id },
            include: {
                model: models.Role,
                as: "roles",
                required: false,
                include: {
                    model: models.Permission,
                    as: "permissions",
                    required: false,
                },
            },
        });

        return AdminDTO.transformDetail(admin);
    }

    public profile = async (id) => {
        const admin = await models.Admin.findOne({
            where: { id },
            include: {
                model: models.Role,
                as: "roles",
                required: false,
                include: {
                    model: models.Permission,
                    as: "permissions",
                    required: false,
                },
            },
        });

        return AdminDTO.transformProfile(admin);
    }

    public update = async (body) => {

        const t = await models.sequelize.transaction();
        const id = body.id;

        const newItem = {
            username: body.username,
            name: body.name,
            email: body.email,
            password: body.password,
        }

        try {
            await models.Admin.update({ ...newItem },
                { where: { id } },
                { transaction: t })

            await models.AdminRole.destroy(
                { where: { admin_id: id } },
                { transaction: t });

            for (const role of body.roles) {
                try {
                    await models.AdminRole.create({
                        role_id: role,
                        admin_id: id,

                    }, { transaction: t });
                } catch (error) {
                    console.log(error);
                }
            }

            await t.commit();

        } catch (error) {
            console.log(error);
            await t.rollback();
        }
    }

    public deleteById = async (id) => {
        return await models.Admin.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids) => {
        return await models.Admin.destroy({ where: { id: ids } });
    }

}