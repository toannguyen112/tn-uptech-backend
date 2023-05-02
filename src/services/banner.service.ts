import { BannerDTO } from "../dtos/banner.dto";
import models from "../infra/sequelize/models";
import { ApiFeatures } from "../utils/ApiFeatures";
import { Op } from "sequelize";
import Helper from "../utils/Helper";
export class BannerService {

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
                        model: models.BannerTranslation,
                        as: "translations",
                        required: true,
                        where: queryTranslation
                    },
                ])
                .sort(query.sort_field || "createdAt", query.sort_order || "DESC")
                .paginate()
                .paranoid()
                .getObjQuery();

            const { count, rows }: any = await models.Banner.findAndCountAll(objQuery);

            const result = {
                page: Number(query?.page) * 1,
                pageSize: Number(query?.page_size) * 1,
                pageCount: Math.ceil(count / Number(query?.page_size) * 1),
                totalItems: count || 0,
                data: rows.map((item) => BannerDTO.transform(item)),
            };

            return result;
        } catch (error) {
            console.log(error);
        }
    }

    public getListBannerClient = async () => {

        try {
            const rows = await models.Banner.findAll({
                include: [
                    {
                        model: models.Media,
                        as: "image",
                        required: false,
                    },
                    {
                        model: models.BannerTranslation,
                        as: "translations",
                        required: true,
                        where: {
                            locale: global.lang
                        },
                    },
                ]
            });
            return rows.map((item) => {
                return BannerDTO.transform(item)
            });

        } catch (error) {
            console.log(error);
        }
    }

    public store = async (body) => {

        const t = await models.sequelize.transaction();

        try {
            const banner = await models.Banner.create({
                ...body,
                thumbnail: body.thumbnail ? body.thumbnail.id : null,
            }, { transaction: t });

            for (const lang of Helper.langs) {
                await models.BannerTranslation.create({
                    ...body,
                    banner_id: banner.id,
                    locale: lang
                }, { transaction: t });
            }

            await t.commit();
        } catch (error) {
            console.log(error);
            await t.rollback();
        }
    }

    public findById = async (id: string | number) => {

        const banner = await models.Banner.findOne({
            where: { id },
            include: [
                {
                    model: models.Media,
                    as: "image",
                    required: false,
                },
                {
                    model: models.BannerTranslation,
                    as: "translations",
                    required: true,
                    where: {
                        locale: global.lang,
                        banner_id: id,
                    }
                },
            ]
        });

        return BannerDTO.transformDetail(banner);
    }

    public updateById = async (id: string, body) => {

        delete body.id;

        const t = await models.sequelize.transaction();

        return await models.Banner.update({
            status: body.status,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
        }, { where: { id } },
        )
            .then(async (res) => {
                try {
                    return await models.BannerTranslation.update({ ...body },
                        {
                            where: {
                                banner_id: id,
                                locale: global.lang
                            }
                        });
                } catch (error) {
                    console.log(error);
                    await t.rollback();
                }

                await t.commit();

            }).catch(async (error) => {
                await t.rollback();
            });
    }


    public deleteById = async (id: string) => {
        return await models.Banner.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids: []) => {
        return await models.Banner.destroy({ where: { id: ids } })
    }
}