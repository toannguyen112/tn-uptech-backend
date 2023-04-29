import { JobDTO } from "../dtos/job.dtos";
import models from "../infra/sequelize/models";
import { ApiFeatures } from "../utils/ApiFeatures";
import { Op } from "sequelize";
import Helper from "../utils/Helper";

export class JobService {

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
                        model: models.JobTranslation,
                        as: "translations",
                        where: queryTranslation
                    },
                ])
                .sort(query.sort_field || "createdAt", query.sort_order || "DESC")
                .paginate()
                .paranoid()
                .getObjQuery();

            const { count, rows }: any = await models.Job.findAndCountAll(objQuery);

            const result = {
                page: Number(query?.page) * 1,
                pageSize: Number(query?.page_size) * 1,
                pageCount: Math.ceil(count / Number(query?.page_size) * 1),
                totalItems: count || 0,
                data: rows.map((item: any) => JobDTO.transform(item)),
            };

            return result;
        } catch (error) {
            console.log(error.message);
        }
    }

    public getListFeatured = async () => {
        try {
            const rows = await models.Job.findAll({
                where: { isFeatured: true },
                include: {
                    model: models.JobTranslation,
                    as: "translations",
                    where: { locale: global.lang }
                },
            });

            return rows.map((item) => {
                return JobDTO.transformClient(item);
            })

        } catch (error) {
            console.log(error.message);
        }
    }

    public store = async (body) => {

        const t = await models.sequelize.transaction();

        const newItem = JobDTO.transformSave(body);

        try {

            return await models.Job.create({ ...newItem }, { transaction: t })
                .then(async (job: any) => {
                    if (job) {
                        try {

                            for (const lang of Helper.langs) {
                                await models.JobTranslation.create({
                                    ...body,
                                    job_id: job.id,
                                    locale: lang
                                },
                                    { transaction: t });
                            }

                        } catch (error) {
                            console.log(error);
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

        const job = await models.Job.findOne({
            where: { id },
            include: [
                {
                    model: models.JobTranslation,
                    as: "translations",
                    required: true,
                    where: {
                        locale: global.lang,
                        job_id: id
                    }
                },
            ]
        });

        return JobDTO.transformDetail(job);
    }

    public findByIdClient = async (id) => {

        const job = await models.Job.findOne({
            where: { id },
            include: [
                {
                    model: models.JobTranslation,
                    as: "translations",
                    required: true,
                    where: {
                        locale: global.lang,
                        job_id: id
                    }
                },
            ]
        });

        let jobRelated = [];

        if (job.related && job.related.length) {
            jobRelated = await models.Job.findAll({
                where: {
                    id: {
                        [Op.in]: job.related
                    }
                },
                include: [
                    {
                        model: models.JobTranslation,
                        as: "translations",
                        required: true,
                        where: {
                            locale: global.lang,
                            job_id: id
                        }
                    },
                ]
            });
        }

        return JobDTO.transformDetailClient({ ...job, jobRelated });
    }

    public update = async (id, body) => {

        delete body.id;

        const newItem = JobDTO.transformSave(body);

        const t = await models.sequelize.transaction();

        try {

            return await models.Job.update({
                ...newItem,
            }, {
                where: { id },
                individualHooks: true
            },

                { transaction: t })
                .then(async (res) => {
                    try {
                        return await models.JobTranslation.update({
                            ...body,
                        },
                            {
                                where: { job_id: id, locale: global.lang },
                                individualHooks: true,
                            },
                        );
                    } catch (error) {
                        console.log(error);
                        await t.rollback();
                    }

                    await t.commit();
                });

        } catch (error) {
            console.log(error);
            await t.rollback();
        }
    }

    public handleUpdate = async (job_id, lang = "vi", body) => {


    }

    public deleteById = async (id: string) => {
        return await models.Job.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids: []) => {
        return await models.Job.destroy({ where: { id: ids } })
    }
}