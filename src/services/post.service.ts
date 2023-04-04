import { PostDTO } from "../dtos/post.dtos";
import models from "../infra/sequelize/models";
import { ApiFeatures } from "../utils/ApiFeatures";
import { Op } from "sequelize";
import Helper from "../utils/Helper";
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
                    locale: "vi"
                }
            }
            else {
                queryTranslation = { locale: "vi" }
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
            console.log(error.message);
        }
    }

    public store = async (body) => {

        return await models.Post.create({
            ...body,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
            banner: body.banner ? body.banner.id : null,
        },
            {
                individualHooks: true,
            }
        )
            .then(async (post: any) => {

                if (post) {
                    const postId = post.id;

                    await models.PostTranslation.create({
                        ...body,
                        slug: Helper.renderSlug(body.slug ? body.slug : body.name),
                        custom_slug: Helper.renderSlug(body.custom_slug ? body.custom_slug : body.name),
                        post_id: postId,
                        locale: 'vi'
                    });

                    // await models.PostTranslation.create({
                    //     ...body,
                    //     slug: Helper.renderSlug(body.slug ? body.slug : body.name),
                    //     custom_slug: Helper.renderSlug(body.custom_slug ? body.custom_slug : body.name),
                    //     post_id: postId,
                    //     locale: 'en'
                    // });
                }
            });
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
                    model: models.Ceo,
                    as: "ceo",
                    required: false,
                    include: {
                        model: models.CeoTranslation,
                        as: "translations",
                        required: true,
                        where: {
                            locale: "vi",
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
                        locale: "vi",
                        post_id: id
                    }
                },
            ]
        });

        return PostDTO.transformDetail(post);
    }

    public update = async (id, body) => {

        return await models.Post.update({
            related: body.related,
            status: body.status,
            images: body.images,
            isFeatured: body.isFeatured,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
            banner: body.banner ? body.banner.id : null,
        }, { where: { id } },
        )
            .then(async (res) => {

                if (res) {
                    await this.handleUpdate({ post_id: id, lang: "vi", body });
                    await this.handleUpdate({ post_id: id, lang: "en", body });
                }
            });
    }

    public handleUpdate = async ({ post_id, lang = "vi", body }) => {

        try {
            return await models.PostTranslation.update({
                name: body.name,
                content: body.content,
                description: body.description,
                slug: Helper.renderSlug(body.slug ? body.slug : body.name),
                custom_slug: Helper.renderSlug(body.custom_slug ? body.custom_slug : body.name),
            },
                { where: { post_id, locale: lang } });
        } catch (error) {
            console.log(error.message);
        }
    }

    public delete = async (id) => {
        return await models.Post.destroy({ where: { id } });
    }
}