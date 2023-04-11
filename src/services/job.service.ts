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
                        model: models.JobTranslation,
                        as: "translations",
                        required: true,
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

    public store = async (body) => {

        return await models.Job.create(body)
            .then(async (job: any) => {

                if (job) {
                    const jobId = job.id;

                    await models.JobTranslation.create({
                        ...body,
                        job_id: jobId,
                        locale: 'vi'
                    });

                    await models.JobTranslation.create({
                        ...body,
                        job_id: jobId,
                        locale: 'en'
                    });
                }
            });
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
                        locale: "vi",
                        job_id: id
                    }
                },
            ]
        });

        return JobDTO.transformDetail(job);
    }

    public update = async (id, body) => {

        return await models.Job.update({
            related: body.related,
            status: body.status
        }, { where: { id } },)
            .then(async (res) => {
                if (res) {
                    await this.handleUpdate({ job_id: id, lang: "vi", body });
                    await this.handleUpdate({ job_id: id, lang: "en", body });
                }
            });
    }

    public handleUpdate = async ({ job_id, lang = "vi", body }) => {

        try {
            return await models.JobTranslation.update({
                name: body.name,
                content: body.content,
                description: body.description,
                slug: Helper.renderSlug(body.slug ? body.slug : body.name),
                custom_slug: Helper.renderSlug(body.custom_slug ? body.custom_slug : body.name),
            },
                { where: { job_id, locale: lang } });
        } catch (error) {
            console.log(error.message);
        }
    }

    public deleteById = async (id: string) => {
        return await models.Job.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids: []) => {
        return await models.Job.destroy({ where: { id: ids } })
    }
}