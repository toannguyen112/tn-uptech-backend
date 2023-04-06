import models from "../infra/sequelize/models";
import { ApiFeatures } from "../utils/ApiFeatures";
import { CategoryDTO } from "../dtos/category.dtos";
import { Op } from "sequelize";
import Helper from "../utils/Helper";
import { logger } from "../utils/logger";
export class CategoryService {

    public getList = async (query) => {

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
                    model: models.CategoryTranslation,
                    as: "translations",
                    require: true,
                    where: queryTranslation
                },
            ])
            .paginate()
            .paranoid()
            .getObjQuery();

        const { count, rows }: any = await models.Category.findAndCountAll(objQuery);

        const transformData = rows.map((item) => {
            return CategoryDTO.transform(item)
        });

        const result = {
            page: Number(query?.page) * 1,
            pageSize: Number(query?.page_size) * 1,
            pageCount: Math.ceil(count / Number(query?.page_size) * 1),
            totalItems: count || 0,
            data: transformData,
        };

        return result;
    }

    public store = async (body) => {
        return await models.Category.create({ ...body })
            .then(async (category: any) => {

                if (category) {
                    const categoryId = category.id;
                    try {

                        const newItem = {
                            ...body,
                            slug: Helper.renderSlug(body.slug ? body.slug : body.name),
                            custom_slug: Helper.renderSlug(body.custom_slug ? body.custom_slug : body.name),
                        }

                        await models.CategoryTranslation.create({
                            ...newItem, category_id: categoryId,
                            locale: 'vi'
                        });

                        await models.CategoryTranslation.create({
                            ...newItem,
                            slug: Helper.renderSlug(body.slug ? `en-${body.slug}` : `en-${body.name}`),
                            custom_slug: Helper.renderSlug(body.custom_slug ? `en-${body.custom_slug}` : `en-${body.name}`),
                            category_id: categoryId,
                            locale: 'en'
                        });

                    } catch (error) {
                        logger.error(JSON.stringify(error));
                    }
                }
            });
    }

    public findById = async (id: string | number) => {
        const res = await models.Category.findOne({
            where: { id },
            include: [
                {
                    model: models.CategoryTranslation,
                    as: "translations",
                    require: true,
                    where: { locale: global.lang, }
                },
            ]
        });

        return CategoryDTO.transform(res);
    }

    public updateById = async (id, body) => {
        return await models.Category.update({
            ...body
        }, { where: { id } },
        )
            .then(async (res) => {
                try {
                    return await models.CategoryTranslation.update({
                        ...body,
                        slug: Helper.renderSlug(body.slug ? body.slug : body.name),
                        custom_slug: Helper.renderSlug(body.custom_slug ? body.custom_slug : body.name),
                    },
                        { where: { post_id: id, locale: global.lang } });
                } catch (error) {
                    console.log(error);
                }
            });
    }

    public deleteById = async (id) => {
        return await models.Category.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids) => {
        return await models.Category.destroy({ where: { id: ids } })
    }

}