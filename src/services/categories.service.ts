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

    public getListCategories = async () => {
        const rows = await models.Category.findAll({
            where: { status: "active" },
            include: {
                model: models.CategoryTranslation,
                as: "translations",
                require: true,
                where: { locale: global.lang }
            },
        });

        const transformData = rows.map((item) => {

            if (!item.translations.length) return {};

            const translationData = item.translations[0];

            return {
                id: item.id,
                name: translationData.name || "",
                slug: translationData.slug || "",
            }
        });

        return transformData;
    }

    public store = async (body: any) => {

        const t = await models.sequelize.transaction();

        return await models.Category.create({ ...body })
            .then(async (category: any) => {

                if (category) {
                    try {

                        for (const lang of Helper.langs) {
                            await models.CategoryTranslation.create({
                                ...body,
                                category_id: category.id,
                                locale: lang
                            }, { transaction: t });
                        }

                    } catch (error) {
                        console.log(error);
                        await t.rollback();
                    }

                    await t.commit();
                }
            }).catch(async (error) => {
                console.log(error);
                await t.rollback();
            });
    }

    public findById = async (id) => {
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

    public updateById = async (id, body: any) => {

        delete body.id;

        const t = await models.sequelize.transaction();

        return await models.Category.update({
            ...body
        }, { where: { id } },
        )
            .then(async (res) => {
                try {
                    return await models.CategoryTranslation.update({
                        ...body,
                    }, {
                        where: {
                            category_id: id,
                            locale: global.lang
                        }
                    },
                        { transaction: t });
                } catch (error) {
                    logger.error(JSON.stringify(error));
                    await t.rollback();
                }
            }).catch(async (error) => {
                await t.rollback();
            });
    }

    public deleteById = async (id) => {
        return await models.Category.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids) => {
        return await models.Category.destroy({ where: { id: ids } });
    }

}