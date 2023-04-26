import { PostDTO } from "../dtos/post.dtos";
import { ApiFeatures } from "../utils/ApiFeatures";
import { Op } from "sequelize";
import { logger } from "../utils/logger";

import models from "../infra/sequelize/models";

export class ContactService {

    public index = async (query) => {
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
                queryTranslation = { locale: global.lang }
            }

            const objQuery = new ApiFeatures(query)
                .filter(conditions)
                .includes([
                    {
                        model: models.Media,
                        as: "image",
                        required: false,
                    },
                ])
                .sort(query.sort_field || "createdAt", query.sort_order || "DESC")
                .paginate()
                .paranoid()
                .getObjQuery();

            const { count, rows }: any = await models.Contact.findAndCountAll(objQuery);

            const result = {
                page: Number(query?.page) * 1,
                pageSize: Number(query?.page_size) * 1,
                pageCount: Math.ceil(count / Number(query?.page_size) * 1),
                totalItems: count || 0,
                data: rows.map((item: any) => PostDTO.transform(item)),
            };

            return result;

        } catch (error) {
            console.log(error);
            logger.error(JSON.stringify(error));
        }
    }

    public store = async (body) => {
        console.log(body);
        return;

        try {
            const banner = await models.Contact.create({ ...body });
            ;
        } catch (error) {
            console.log(error);
        }

    }

    public findById = async (id) => {

        const post = await models.Contact.findOne({
            where: { id },
            include: [
                {
                    model: models.Media,
                    as: "image",
                    required: false,
                },
            ]
        });

        return PostDTO.transformDetail(post);
    }

    public updateById = async (id, body) => {

        return await models.Contact.update({
            ...body,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
            banner: body.banner ? body.banner.id : null,
        }, { where: { id }, individualHooks: true },
        )
            .then(async (res: any) => {
                await this.handleUpdate({ post_id: id, lang: global.lang, body });
            });
    }

    public handleUpdate = async ({ post_id, lang = "vi", body }) => {
        try {
            return await models.PostTranslation.update({
                name: body.name,
                content: body.content,
                description: body.description,
                meta_title: body.meta_title,
                meta_description: body.meta_description,
                meta_keyword: body.meta_keyword,
                meta_robots: body.meta_robots,
                canonica_link: body.canonica_link,
                meta_image: body.meta_image,
                meta_viewport: body.meta_viewport,
            },
                { where: { post_id, locale: lang }, individualHooks: true });
        } catch (error) {
            logger.error(JSON.stringify(error));
        }
    }

    public deleteById = async (id) => {
        return await models.Contact.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids) => {
        return await models.Contact.destroy({ where: { id: ids } });
    }
}