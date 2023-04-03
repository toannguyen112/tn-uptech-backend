import { CeoDTO } from "../dtos/ceo.dto";
import models from "../infra/sequelize/models";
import { ApiFeatures } from "../utils/ApiFeatures";

import Helper from "../utils/Helper";
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
                    locale: "vi"
                }
            }
            else {
                queryTranslation = {
                    locale: "vi"
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

    public store = async (body) => {

        return await models.Ceo.create({
            ...body,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
            banner: body.banner ? body.banner.id : null,
        },
            {
                individualHooks: true,
            }
        )
            .then(async (project: any) => {

                if (project) {
                    const projectId = project.id;

                    await models.CeoTranslation.create({
                        ...body,
                        slug: Helper.renderSlug(body.slug ? body.slug : body.name),
                        custom_slug: Helper.renderSlug(body.custom_slug ? body.custom_slug : body.name),
                        ceo_id: projectId,
                        locale: 'vi'
                    });

                    await models.CeoTranslation.create({
                        ...body,
                        slug: Helper.renderSlug(body.slug ? `en-${body.slug}` : `en-${body.name}`),
                        custom_slug: Helper.renderSlug(body.custom_slug ? `en-${body.custom_slug}` : `en-${body.name}`),
                        ceo_id: projectId,
                        locale: 'en'
                    });
                }
            });
    }

    public findById = async (id: string | number) => {

        const project = await models.Ceo.findOne({
            where: {
                id: id,
            },
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
                        locale: "vi",
                        ceo_id: id,
                    }
                },
            ]
        });

        return CeoDTO.transformDetail(project);
    }

    public updateById = async (id: string, body) => {

        return await models.Ceo.update({
            status: body.status,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
        }, { where: { id } },
        )
            .then(async (res) => {

                if (res) {
                    await this.handleUpdate({ ceo_id: id, lang: "vi", body });
                    await this.handleUpdate({ ceo_id: id, lang: "en", body });
                }
            });
    }

    public handleUpdate = async ({ ceo_id, lang = "vi", body }) => {

        try {
            return await models.CeoTranslation.update({
                name: body.name,
                detail: body.detail,
                description: body.description,
                slug: Helper.renderSlug(body.slug ? body.slug : body.name),
                custom_slug: Helper.renderSlug(body.custom_slug ? body.custom_slug : body.name),
            },
                {
                    where: {
                        ceo_id,
                        locale: lang
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    public deleteById = async (id: string) => {
        return await models.Ceo.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids: []) => {
        return await models.Ceo.destroy({ where: { id: ids } })
    }
}