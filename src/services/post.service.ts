import { PostDTO } from "../dtos/post.dtos";
import { ApiFeatures } from "../utils/ApiFeatures";
import { Op } from "sequelize";
import { logger } from "../utils/logger";

import models from "../infra/sequelize/models";

export class PostService {

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
                    {
                        model: models.Category,
                        as: "category",
                        required: false,
                        include: {
                            model: models.CategoryTranslation,
                            as: "translations",
                            required: false,
                            where: { locale: global.lang }
                        }
                    },
                    {
                        model: models.PostTranslation,
                        as: "translations",
                        required: true,
                        where: queryTranslation
                    },
                ])
                .sort(query.sort_field || "createdAt", query.sort_order || "DESC")
                .paginate()
                .paranoid()
                .getObjQuery();

            const { count, rows }: any = await models.Post.findAndCountAll(objQuery);

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

    public getDataOfCategory = async (category_slug: string) => {
        try {

            const postMostView = await models.Post.findOne({});

            const rows = await models.Post.findAll({
                where: {status: 'active'},
                include: [
                    {
                        model: models.Media,
                        as: "image",
                        required: false,
                    },
                    {
                        model: models.Category,
                        as: "category",
                        required: true,
                        include: {
                            model: models.CategoryTranslation,
                            as: "translations",
                            required: true,
                            where: {
                                slug: category_slug,
                                locale: global.lang
                            }
                        }
                    },
                    {
                        model: models.PostTranslation,
                        as: "translations",
                        required: true,
                        where: { locale: global.lang }
                    },
                ]
            });

            return {
                listPost: rows.map((item: any) => {
                    return PostDTO.transform(item);
                }),
                postMostView
            }

        } catch (error) {
            console.log(error);
            logger.error(JSON.stringify(error));
        }

    }

    public getListFeatured = async () => {
        try {

            const rows = await models.Post.findAll({
                where: { isFeatured: true, status: 'active' },
                include: [
                    {
                        model: models.Media,
                        as: "image",
                        required: false,
                    },
                    {
                        model: models.Category,
                        as: "category",
                        required: false,
                        include: {
                            model: models.CategoryTranslation,
                            as: "translations",
                            required: true,
                            where: { locale: global.lang }
                        }
                    },
                    {
                        model: models.PostTranslation,
                        as: "translations",
                        required: true,
                        where: { locale: global.lang }
                    },
                ]
            });

            return rows.map((item: any) => {
                return PostDTO.transform(item);
            });

        } catch (error) {
            console.log(error);
            logger.error(JSON.stringify(error));
        }
    }


    public store = async (body) => {

        const t = await models.sequelize.transaction();

        try {
            return await models.Post.create({
                status: body.status,
                ceo_id: body.ceo_id,
                category_id: body.category_id,
                isFeatured: body.isFeatured,
                related: body.related,
                images: body.images,
                thumbnail: body.thumbnail ? body.thumbnail.id : null,
                banner: body.banner ? body.banner.id : null,
            }, { individualHooks: true }, { transaction: t }
            )
                .then(async (post: any) => {

                    if (post) {
                        const postId = post.id;
                        try {

                            await models.PostTranslation.create({
                                ...body,
                                post_id: postId,
                                locale: 'vi'
                            }, { transaction: t });

                            await models.PostTranslation.create({
                                ...body,
                                post_id: postId,
                                locale: 'en'
                            }, { transaction: t });

                        } catch (error) {
                            console.log(error);
                            logger.error(JSON.stringify(error));
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

        const post = await models.Post.findOne({
            where: { id },
            include: [
                {
                    model: models.Media,
                    as: "image",
                    required: false,
                },
                {
                    model: models.Category,
                    as: "category",
                    required: false,
                    include: {
                        model: models.CategoryTranslation,
                        as: "translations",
                        required: true,
                        where: { locale: global.lang }
                    }
                },
                {
                    model: models.Ceo,
                    as: "ceo",
                    required: false,
                    include: {
                        model: models.CeoTranslation,
                        as: "translations",
                        required: true,
                        where: {
                            locale: global.lang,
                            ceo_id: id
                        }
                    },
                },
                {
                    model: models.Media,
                    as: "banner_image",
                    required: false,
                },
                {
                    model: models.PostTranslation,
                    as: "translations",
                    required: true,
                    where: {
                        locale: global.lang,
                        post_id: id
                    }
                },
            ]
        });

        return PostDTO.transformDetail(post);
    }

    public updateById = async (id, body) => {

        return await models.Post.update({
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
        return await models.Post.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids) => {
        return await models.Post.destroy({ where: { id: ids } });
    }
}