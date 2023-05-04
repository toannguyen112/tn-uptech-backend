
import { ApiFeatures } from "../utils/ApiFeatures";
import { Op } from "sequelize";
import { logger } from "../utils/logger";
import models from "../infra/sequelize/models";
import { ServiceDTO } from "../dtos/service.dtos";
import Helper from "../utils/Helper";
export class ServiceService {

    public getList = async (query) => {
        try {
            const conditions = {
                parent_id: 0
            };

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
                queryTranslation = { locale: global.lang }
            }

            const objQuery = new ApiFeatures(query)
                .filter(conditions)
                .includes([
                    {
                        model: models.ServiceTranslation,
                        as: "translations",
                        required: true,
                        where: queryTranslation
                    },
                ])
                .sort(query.sort_field || "createdAt", query.sort_order || "DESC")
                .paginate()
                .paranoid()
                .getObjQuery();

            const { count, rows }: any = await models.Service.findAndCountAll(objQuery);

            const result = {
                page: Number(query?.page) * 1,
                pageSize: Number(query?.page_size) * 1,
                pageCount: Math.ceil(count / Number(query?.page_size) * 1),
                totalItems: count || 0,
                data: rows.map((item: any) => ServiceDTO.transform(item)),
            };

            return result;

        } catch (error) {
            console.log(error);
            logger.error(JSON.stringify(error));
        }
    }

    public getNav = async () => {

        try {
            const rows = await models.Service.findAll({
                where: { parent_id: 0 },
                include: [
                    {
                        model: models.Media,
                        as: "image",
                        required: false,
                    },
                    {
                        model: models.ServiceTranslation,
                        as: "translations",
                        required: true,
                        where: {
                            locale: global.lang,
                        }
                    },
                    {
                        model: models.Service,
                        as: "children",
                        include: [
                            {
                                model: models.ServiceTranslation,
                                as: "translations",
                                required: true,
                                where: {
                                    locale: global.lang,
                                },
                            },
                            {
                                model: models.Media,
                                as: "image",
                                required: false,
                            },
                        ]
                    }
                ]
            });

            return rows.map((item) => {
                return {
                    key: item.id,
                    label: item.translations[0].name,
                    slug: item.translations[0].slug,
                    thumbnail: item.image ? item.image.path : "",
                    children: item.children.map((item) => {
                        return {
                            key: item.id,
                            thumbnail: item.image ? item.image.path : "",
                            label: item.translations[0].name,
                            slug: item.translations[0].slug,
                        }
                    })
                }
            });

        } catch (error) {
            console.log(error);
            logger.error(JSON.stringify(error));
        }
    }

    public findByIdClient = async (id) => {

        try {
            const service = await models.Service.findOne({
                where: { id },
                include: [
                    {
                        model: models.ServiceTranslation,
                        as: "translations",
                        required: true,
                        where: { locale: global.lang }
                    },
                ]
            });

            return service;

        } catch (error) {
            console.log(error);
            logger.error(JSON.stringify(error));
        }

    }

    public getListFeatured = async () => {
        try {

            const rows = await models.Service.findAll({
                include: [
                    {
                        model: models.ServiceTranslation,
                        as: "translations",
                        required: true,
                        where: {
                            locale: global.lang,
                        }
                    },
                    {
                        model: models.Media,
                        as: "image",
                        required: false,
                    },
                ],
                order: [
                    ['isFeatured', 'DESC'],
                    ['createdAt', 'DESC']],
                limit: 3
            });

            return rows.map((item: any) => {
                return ServiceDTO.transform(item);
            });

        } catch (error) {
            console.log(error);
            logger.error(JSON.stringify(error));
        }
    }

    public getListService = async () => {

        try {
            const rows = await models.Service.findAll({
                where: { parent_id: 0 },
                include: [
                    {
                        model: models.ServiceTranslation,
                        as: "translations",
                        required: true,
                        where: {
                            locale: global.lang,
                        }
                    },
                    {
                        model: models.Service,
                        as: "children",
                        include: [
                            {
                                model: models.ServiceTranslation,
                                as: "translations",
                                required: true,
                                where: {
                                    locale: global.lang,
                                },
                            },
                            {
                                model: models.Media,
                                as: "image",
                                required: false,
                            },
                        ]
                    }
                ]
            });

            const data = rows.map((item) => {
                return {
                    id: item.id,
                    name: item.translations[0].name,
                    slug: item.translations[0].slug,
                    thumbnail: item.image ? item.image.path : "",
                    children: item.children.map((item) => {
                        return {
                            id: item.id,
                            thumbnail: item.image ? item.image.path : "",
                            name: item.translations[0].name,
                            slug: item.translations[0].slug,
                        }
                    })
                }
            });

            return Helper.getNodesFlatten(data);

        } catch (error) {
            console.log(error);
        }
    }

    public store = async (body) => {

        console.log(body);
        return;

        const t = await models.sequelize.transaction();

        try {
            const service = await models.Service.create(
                { ...body },
                { individualHooks: true },
                { transaction: t }
            );

            try {

                for (const lang of Helper.langs) {
                    await models.ServiceTranslation.create({
                        ...body,
                        service_id: service.id,
                        locale: lang
                    }, { transaction: t });
                }

            } catch (error) {
                console.log(error);
                await t.rollback();
            }

            await t.commit();

            return service;
        } catch (error) {
            console.log(error);
            await t.rollback();
        }
    }

    public findById = async (id) => {

        const service = await models.Service.findOne({
            where: { id },
            include: [
                {
                    model: models.Media,
                    as: "image",
                    required: false,
                },
                {
                    model: models.ServiceTranslation,
                    as: "translations",
                    required: true,
                    where: {
                        locale: global.lang,
                        service_id: id
                    }
                },
            ]
        });

        return ServiceDTO.transformDetail(service);
    }

    public updateById = async (id, body) => {

        delete body.id;

        const t = await models.sequelize.transaction();

        return await models.Service.update({
            ...body,
            isFeatured: 1,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
        },
            {
                where: { id },
                individualHooks: true
            },
        )
            .then(async (res: any) => {

                try {
                    return await models.ServiceTranslation.update({
                        ...body,

                    },
                        {
                            where: {
                                service_id: id,
                                locale: global.lang
                            },
                            individualHooks: true
                        });
                } catch (error) {
                    console.log(error);
                    logger.error(JSON.stringify(error));
                    await t.rollback();
                }

                await t.commit();
            }).catch(async (error) => {
                console.log(error);
                await t.rollback();
            });
    }

    public deleteById = async (id) => {
        return await models.Service.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids) => {
        return await models.Service.destroy({ where: { id: ids } });
    }
}