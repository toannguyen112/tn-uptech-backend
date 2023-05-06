import { PostDTO } from "../dtos/post.dtos";
import { ApiFeatures } from "../utils/ApiFeatures";
import { Op } from "sequelize";
import { logger } from "../utils/logger";

import models from "../infra/sequelize/models";
import Helper from "../utils/Helper";
import { CategoryDTO } from "../dtos/category.dtos";

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

    public getPageAll = async () => {

        const relation = [
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
        ];

        try {

            const postLatest = await models.Post.findOne({
                where: { status: 'active', },
                limit: 1,
                order: [['createdAt', 'DESC']],
                include: relation
            });

            const category = await models.Category.findOne({
                where: {
                    status: 'active',
                },
                include: {
                    model: models.CategoryTranslation,
                    as: "translations",
                    required: true,
                    where: {
                        locale: global.lang
                    }
                },
                order: [['createdAt', 'DESC']],
            });

            const postsOfCategory = await models.Post.findAll({
                where: {
                    status: 'active',
                    category_id: category.id
                },
                include: relation
            });

            const postsMore = await models.Post.findAll({
                where: { status: 'active' },
                include: relation
            });

            let postMostView;

            await models.Post.findOne({
                attributes: [
                    [models.sequelize.fn('max', models.sequelize.col('view')), 'max_views']
                ],
                raw: true
            }).then(async (result) => {
                const maxViews = result.max_views;
                await models.Post.findOne({
                    where: { view: maxViews },
                    include: [
                        {
                            model: models.PostTranslation,
                            as: "translations",
                            required: true,
                            where: { locale: global.lang }
                        },
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
                                    locale: global.lang,
                                }
                            }
                        },
                    ]
                },
                ).then(post => {
                    postMostView = post;
                }).catch((error) => {
                    logger.error(JSON.stringify(error));
                });
            });

            return {
                postLatest: postLatest ? PostDTO.transform(postLatest) : null,
                category: category ? CategoryDTO.transform(category) : null,
                postMostView: postMostView ? PostDTO.transform(postMostView) : null,
                postsOfCategory: postsOfCategory.map((item) => {
                    return PostDTO.transform(item);
                }),
                postsMore: postsMore.map((item: any) => {
                    return PostDTO.transform(item);
                }),
            };
        } catch (error) {
            console.log(error);
            logger.error(JSON.stringify(error));
        }
    }

    public getDataOfCategory = async (category_slug: string) => {
        try {

            let postMostView;

            await models.Post.findOne({
                attributes: [
                    [models.sequelize.fn('max', models.sequelize.col('view')), 'max_views']
                ],
                raw: true
            }).then(async (result) => {
                const maxViews = result.max_views;
                await models.Post.findOne({
                    where: { view: maxViews },
                    include: [
                        {
                            model: models.PostTranslation,
                            as: "translations",
                            required: true,
                            where: { locale: global.lang }
                        },
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
                                    locale: global.lang,
                                    slug: category_slug
                                }
                            }
                        },
                    ]
                },
                ).then(post => {
                    postMostView = post;
                }).catch((error) => {
                    logger.error(JSON.stringify(error));
                });
            });

            const rows = await models.Post.findAll({
                where: { status: 'active' },
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
                postMostView: postMostView ? PostDTO.transform(postMostView) : null,
                listPost: rows.map((item: any) => {
                    return PostDTO.transform(item);
                }) ?? [],
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
                ...body,
                thumbnail: body.thumbnail ? body.thumbnail.id : null,
                banner: body.banner ? body.banner.id : null,
            },
                { individualHooks: true },
                { transaction: t }
            )
                .then(async (post: any) => {

                    try {

                        for (const lang of Helper.langs) {
                            await models.PostTranslation.create({
                                ...body,
                                post_id: post.id,
                                locale: lang
                            }, { transaction: t });
                        }

                    } catch (error) {
                        console.log(error);
                        logger.error(JSON.stringify(error));
                        await t.rollback();
                    }

                    await t.commit();

                });
        } catch (error) {
            console.log(error);
            await t.rollback();
        }
    }

    public show = async (id) => {

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
                    }
                },
            ]
        });

        return PostDTO.transformDetail(post);
    }

    public findByIdClient = async (id) => {

        try {
            const post = await models.Post.findOne({
                where: { id },
                include: [
                    {
                        model: models.Media,
                        as: "banner_image",
                        required: false,
                    },
                    {
                        model: models.Category,
                        as: "category",
                        include: {
                            model: models.CategoryTranslation,
                            as: "translations",
                            where: { locale: global.lang }
                        }
                    },
                    {
                        model: models.Ceo,
                        as: "ceo",
                        required: false,
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
                                }
                            },
                        ]
                    },
                    {
                        model: models.PostTranslation,
                        as: "translations",
                        required: true,
                        where: { locale: global.lang }
                    },
                ]
            });

            let postRelated = [];

            if (post.related && post.related.length) {
                postRelated = await models.Post.findAll({
                    where: {
                        status: 'active',
                        id: {
                            [Op.in]: post.related
                        }
                    },
                    include: [
                        {
                            model: models.PostTranslation,
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
                        {
                            model: models.Category,
                            as: "category",
                            include: {
                                model: models.CategoryTranslation,
                                as: "translations",
                                required: true,
                                where: { locale: global.lang }
                            }
                        },
                    ]
                });
            }

            const posts = await models.Post.findAll({
                where: {
                    status: 'active',
                    category_id: post.category_id
                },
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

            return PostDTO.transformDetailClient({ ...post, postRelated, posts });

        } catch (error) {
            console.log(error);
            logger.error(JSON.stringify(error));
        }

    }

    public updateById = async (id, body) => {

        delete body.id;

        const t = await models.sequelize.transaction();

        return await models.Post.update({
            ...body,
            view: Number(body.view),
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
            banner: body.banner ? body.banner.id : null,
        }, { where: { id }, individualHooks: true }, { transaction: t }
        )
            .then(async (res: any) => {

                try {
                    await models.PostTranslation.update({ ...body },
                        {
                            where: { post_id: id, locale: global.lang },
                            individualHooks: true,
                        },
                        { transaction: t });
                } catch (error) {
                    logger.error(JSON.stringify(error));
                    await t.rollback();
                }

                await t.commit();

            }).catch(async (error) => {
                await t.rollback();
            });
    }

    public deleteById = async (id) => {
        return await models.Post.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids) => {
        return await models.Post.destroy({ where: { id: ids } });
    }
}