import { BranchDTO } from "../dtos/branch.dto";
import models from "../infra/sequelize/models";
import { ApiFeatures } from "../utils/ApiFeatures";
import { Op } from "sequelize";
import Helper from "../utils/Helper";
import { logger } from "../utils/logger";
export class BranchService {

    public getList = async (query) => {

        try {
            const conditions = {};

            const queryObject = {
                status: query.status,
                search: query.search,
            };

            const excludedFields = ["page", "page_size", "sort_field", "sort_order", "fields"];

            excludedFields.forEach((field) => delete queryObject[field]);

            let queryTranslation = {};

            if (query.search) {
                queryTranslation = {
                    name: { [Op.like]: `%${query.search}%` },
                    locale: global.lang
                }
            }
            else {
                queryTranslation = {
                    locale: global.lang
                }
            }

            const objQuery = new ApiFeatures(query)
                .filter(conditions)
                .includes([
                    {
                        model: models.BranchTranslation,
                        as: "translations",
                        required: true,
                        where: queryTranslation
                    },
                ])
                .sort(query.sort_field || "createdAt", query.sort_order || "DESC")
                .paginate()
                .paranoid()
                .getObjQuery();

            const { count, rows }: any = await models.Branch.findAndCountAll(objQuery);

            const result = {
                page: Number(query?.page) * 1,
                pageSize: Number(query?.page_size) * 1,
                pageCount: Math.ceil(count / Number(query?.page_size) * 1),
                totalItems: count || 0,
                data: rows.map((item: any) => BranchDTO.transform(item)),
            };

            return result;
        } catch (error) {
            logger.error(JSON.stringify(error));
        }
    }

    public getListBranch = async () => {
        try {
            const rows = await models.Branch.findAll({
                include: [
                    {
                        model: models.BranchTranslation,
                        as: "translations",
                        required: true,
                        where: { locale: global.lang }
                    },
                ]
            });

            return rows.map((item: any) => {
                return BranchDTO.transform(item);
            });

        } catch (error) {
            logger.error(JSON.stringify(error));
        }
    }

    public store = async (body) => {

        const t = await models.sequelize.transaction();

        try {
            models.Branch.create({ ...body },
                { transaction: t })
                .then(async (branch: any) => {
                    for (const lang of Helper.langs) {

                        await models.BranchTranslation.create({
                            ...body,
                            branch_id: branch.id,
                            slug: Helper.renderSlug(body.name, global.lang),
                            locale: lang
                        }, { transaction: t });
                    }
                    await t.commit();
                });

        } catch (error) {
            logger.error(JSON.stringify(error));
            await t.rollback();
        }
    }

    public findById = async (id: string | number) => {

        const branch = await models.Branch.findOne({
            where: { id },
            include: [
                {
                    model: models.BranchTranslation,
                    as: "translations",
                    required: true,
                    where: {
                        locale: global.lang,
                        branch_id: id,
                    }
                },
            ]
        });

        return BranchDTO.transformDetail(branch);
    }

    public updateById = async (id: string | number, body) => {

        delete body.id;

        const t = await models.sequelize.transaction();

        const branch = await models.Branch.update(
            { status: body.status, },
            { where: { id } }, { transaction: t })
            .then(async (res) => {
                try {
                    await models.BranchTranslation.update(
                        {
                            name: body.name,
                            slug: Helper.renderSlug(body.name, global.lang),
                        },
                        {
                            where: {
                                branch_id: id,
                                locale: global.lang
                            },
                            individualHooks: true
                        },
                        { transaction: t }
                    );

                    await t.commit();
                } catch (error) {
                    logger.error(JSON.stringify(error));
                    await t.rollback();
                }
            });

        return branch;
    }

    public deleteById = async (id: string | number) => {
        return await models.Branch.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids: []) => {
        return await models.Branch.destroy({ where: { id: ids } })
    }
}