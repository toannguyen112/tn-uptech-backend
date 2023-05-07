import { CeoDTO } from "../dtos/ceo.dto";
import models from "../infra/sequelize/models";
import { ApiFeatures } from "../utils/ApiFeatures";
import Helper from "../utils/Helper";
import { logger } from "../utils/logger";

import { Op } from "sequelize";
export class CeoService {

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
                        model: models.Media,
                        as: "image",
                        required: false,
                    },
                    {
                        model: models.CeoTranslation,
                        as: "translations",
                        required: true,
                        where: queryTranslation
                    },
                ])
                .sort(query.sort_field || "createdAt", query.sort_order || "DESC")
                .paginate()
                .paranoid()
                .getObjQuery();

            const { count, rows }: any = await models.Ceo.findAndCountAll(objQuery);

            const result = {
                page: Number(query?.page) * 1,
                pageSize: Number(query?.page_size) * 1,
                pageCount: Math.ceil(count / Number(query?.page_size) * 1),
                totalItems: count || 0,
                data: rows.map((item) => CeoDTO.transform(item)),
            };

            return result;

        } catch (error) {
            console.log(error);
        }
    }

    public getListCeo = async () => {
        try {

            const rows = await models.Ceo.findAll({
                where: { status: "active" },
                include: [
                    {
                        model: models.Media,
                        as: "image",
                        required: false,
                    },
                    {
                        model: models.CeoTranslation,
                        as: "translations",
                        required: true,
                        where: { locale: global.lang }
                    },
                ]
            });

            return rows.map((item: any) => {
                return CeoDTO.transform(item);
            });

        } catch (error) {
            console.log(error);
            logger.error(JSON.stringify(error));
        }
    }

    public store = async (body) => {

        const t = await models.sequelize.transaction();

        return await models.Ceo.create({
            ...body,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
        }, { transaction: t })
            .then(async (ceo: any) => {
                if (ceo) {
                    try {
                        for (const lang of Helper.langs) {
                            await models.CeoTranslation.create({
                                ...body,
                                ceo_id: ceo.id,
                                locale: lang
                            }, { transaction: t });
                        }

                    } catch (error) {
                        console.log(error);
                        await t.rollback();
                    }

                    await t.commit();
                }
            }).catch(async (err) => {
                console.log(err);
                await t.rollback();
            });
    }

    public findById = async (id: string | number) => {

        const ceo = await models.Ceo.findOne({
            where: { id },
            include: [
                {
                    model: models.Media,
                    as: "image",
                    required: false,
                },
                {
                    model: models.CeoTranslation,
                    as: "translations",
                    required: true,
                    where: {
                        locale: global.lang,
                        ceo_id: id,
                    }
                },
            ]
        });

        return CeoDTO.transformDetail(ceo);
    }

    public updateById = async (id: string, body) => {

        delete body.id;

        const t = await models.sequelize.transaction();

        return await models.Ceo.update({
            status: body.status,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
        }, { where: { id } },
            { transaction: t }
        )
            .then(async (res) => {
                try {
                    await models.CeoTranslation.update({ ...body },
                        { where: { ceo_id: id, locale: global.lang } },
                        { individualHooks: true },
                        { transaction: t });
                } catch (error) {
                    console.log(error);
                    await t.rollback();
                }

                await t.commit();
            });
    }

    public deleteById = async (id: string) => {
        return await models.Ceo.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids: []) => {
        return await models.Ceo.destroy({ where: { id: ids } })
    }
}