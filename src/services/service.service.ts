
import { ApiFeatures } from "../utils/ApiFeatures";
import { Op } from "sequelize";
import { logger } from "../utils/logger";

import models from "../infra/sequelize/models";
import Helper from "../utils/Helper";
import { ServiceDTO } from "../dtos/service.dtos";
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
                        model: models.ServiceTranslation,
                        as: "translations",
                        required: true,
                        where: {
                            locale: "vi",
                        },
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
                                    locale: "vi"
                                },
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
                    children: item.children.map((item) => {
                        return {
                            key: item.id,
                            label: item.translations[0].name,
                            slug: item.translations[0].slug,
                        }
                    })
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    public store = async (body) => {

        const t = await models.sequelize.transaction();

        try {
            return await models.Service.create({ ...body }, { individualHooks: true }
            )
                .then(async (service: any) => {

                    if (service) {
                        const serviceId = service.id;
                        try {

                            const newItem = {
                                ...body,
                            }

                            await models.ServiceTranslation.create({
                                ...newItem, service_id: serviceId,
                                locale: 'vi'
                            },
                                { transaction: t });

                            await models.ServiceTranslation.create({
                                ...newItem,
                                service_id: serviceId,
                                locale: 'en'
                            },
                                { transaction: t });

                                await models.ServiceTranslation.create({
                                ...newItem,
                                service_id: serviceId,
                                locale: 'ja'
                            },
                                { transaction: t });

                        } catch (error) {
                            console.log(error);
                            logger.error(JSON.stringify(error));
                            await t.rollback();
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

        const service = await models.Service.findOne({
            where: { id },
            include: [
                {
                    model: models.ServiceTranslation,
                    as: "translations",
                    required: true,
                    where: {
                        locale: global.lang,
                        service_id: id
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
                    ]
                }
            ]
        });

        return ServiceDTO.transformDetail(service);
    }

    public updateById = async (id, body) => {

        const t = await models.sequelize.transaction();

        return await models.Service.update({ ...body },
            { where: { id }, individualHooks: true },
        )
            .then(async (res: any) => {
                await this.handleUpdate({ service_id: id, lang: global.lang, body });
            });
    }

    public handleUpdate = async ({ service_id, lang = "vi", body }) => {
        try {
            return await models.ServiceTranslation.update({
                name: body.name,

                meta_title: body.meta_title,
                meta_description: body.meta_description,
                meta_keyword: body.meta_keyword,
                meta_robots: body.meta_robots,
                canonica_link: body.canonica_link,
                meta_image: body.meta_image,
                meta_viewport: body.meta_viewport,
            },
                { where: { service_id, locale: lang }, individualHooks: true });
        } catch (error) {
            logger.error(JSON.stringify(error));
        }
    }

    public deleteById = async (id) => {
        return await models.Service.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids) => {
        return await models.Service.destroy({ where: { id: ids } });
    }
}