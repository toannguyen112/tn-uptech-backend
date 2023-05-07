import models from "../infra/sequelize/models";
import { ApiFeatures } from "../utils/ApiFeatures";
import { ProjectDTO } from "../dtos/project.dto";
import Helper from "../utils/Helper";
import { Op } from "sequelize";
export class ProjectService {

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
                queryTranslation = {
                    locale: global.lang
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
                        model: models.ProjectTranslation,
                        as: "translations",
                        required: true,
                        where: queryTranslation
                    },
                ])
                .sort(query.sort_field || "createdAt", query.sort_order || "DESC")
                .paginate()
                .paranoid()
                .getObjQuery();

            const { count, rows }: any = await models.Project.findAndCountAll(objQuery);

            const result = {
                page: Number(query?.page) * 1,
                pageSize: Number(query?.page_size) * 1,
                pageCount: Math.ceil(count / Number(query?.page_size) * 1),
                totalItems: count || 0,
                data: rows.map((item) => ProjectDTO.transform(item)),
            };

            return result;
        } catch (error) {
            console.log(error);
        }
    }

    public store = async (body) => {

        const t = await models.sequelize.transaction();

        return await models.Project.create({
            ...body,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
            banner: body.banner ? body.banner.id : null,
        }, { individualHooks: true },
            { transaction: t }
        )
            .then(async (project: any) => {

                if (project) {
                    try {

                        for (const branchId of body.branchs) {

                            await models.ProjectBranch.create({
                                project_id: project.id,
                                branch_id: branchId
                            }, { transaction: t });
                        }

                        for (const serviceId of body.services) {
                            await models.ProjectService.create({
                                project_id: project.id,
                                service_id: serviceId
                            }, { transaction: t });
                        }

                        for (const lang of Helper.langs) {
                            await models.ProjectTranslation.create({
                                ...body,
                                project_id: project.id,
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
                await t.rollback();
            });
    }

    public findById = async (id: string | number) => {

        const project = await models.Project.findOne({
            where: { id },
            include: [
                {
                    model: models.Media,
                    as: "image",
                    required: false,
                },
                {
                    model: models.Branch,
                    as: "branchs",
                    required: false,
                    include: [
                        {
                            model: models.BranchTranslation,
                            as: "translations",
                            required: true,
                            where: {
                                locale: global.lang,
                            }
                        }
                    ]
                },
                {
                    model: models.Service,
                    as: "services",
                    required: false,
                    include: [
                        {
                            model: models.ServiceTranslation,
                            as: "translations",
                            required: true,
                            where: {
                                locale: global.lang,
                            }
                        }
                    ]
                },
                {
                    model: models.Media,
                    as: "banner_image",
                    required: false,
                },
                {
                    model: models.ProjectTranslation,
                    as: "translations",
                    required: true,
                    where: {
                        locale: global.lang,
                    }
                },
            ]
        });

        return ProjectDTO.transformDetail(project);
    }

    public getProjectsClient = async (query) => {

        let include = [
            {
                model: models.Media,
                as: "image",
                required: false,
            },
            {
                model: models.ProjectTranslation,
                as: "translations",
                required: true,
                where: {
                    locale: global.lang,
                },
            },

        ]

        const queryBranch = {
            model: models.Branch,
            as: "branchs",
            required: true,
            through: query.branch_id ? {
                where: {
                    branch_id: { [models.Sequelize.Op.eq]: query.branch_id }
                }
            } : null
        }

        const queryService = {
            model: models.Service,
            as: "services",
            required: true,
            include: [
                {
                    model: models.ServiceTranslation,
                    as: "translations",
                    required: true,
                    where: {
                        locale: global.lang,
                    },

                }
            ],
            through: query.service_id ? {
                where: {
                    service_id: { [models.Sequelize.Op.eq]: query.service_id }
                }
            } : null
        }

        if (query.service_id) {
            include = [
                ...include,
                queryService

            ]
        }

        if (query.branch_id) {
            include = [
                ...include,
                queryBranch

            ]
        }

        try {

            const rows = await models.Project.findAll({ where: {}, include });

            const result = {
                data: rows.map((item: any) => ProjectDTO.transformClient(item))
            };

            return result;

        } catch (error) {
            console.log(error);
        }
    }

    public findByIdClient = async (id: string | number) => {

        const project = await models.Project.findOne({
            where: { id },
            include: [
                {
                    model: models.Media,
                    as: "image",
                    required: false,
                },
                {
                    model: models.Branch,
                    as: "branchs",
                    required: false,
                    include: [
                        {
                            model: models.BranchTranslation,
                            as: "translations",
                            required: true,
                            where: {
                                locale: global.lang,
                            }
                        }
                    ]
                },
                {
                    model: models.Service,
                    as: "services",
                    required: false,
                    include: [
                        {
                            model: models.ServiceTranslation,
                            as: "translations",
                            required: true,
                            where: {
                                locale: global.lang,
                            }
                        }
                    ]
                },
                {
                    model: models.Media,
                    as: "banner_image",
                    required: false,
                },
                {
                    model: models.ProjectTranslation,
                    as: "translations",
                    required: true,
                    where: {
                        locale: global.lang,
                    }
                },
            ]
        });

        let related = [];

        if (project.related && project.related.length) {
            related = await models.Project.findAll({
                where: {
                    status: 'active',
                    id: {
                        [Op.in]: project.related
                    }
                },
                include: [
                    {
                        model: models.Media,
                        as: "image",
                        required: false,
                    },
                    {
                        model: models.Branch,
                        as: "branchs",
                        required: false,
                        include: [
                            {
                                model: models.BranchTranslation,
                                as: "translations",
                                required: true,
                                where: {
                                    locale: global.lang,
                                }
                            }
                        ]
                    },
                    {
                        model: models.Service,
                        as: "services",
                        required: false,
                        include: [
                            {
                                model: models.ServiceTranslation,
                                as: "translations",
                                required: true,
                                where: {
                                    locale: global.lang,
                                }
                            }
                        ]
                    },
                    {
                        model: models.ProjectTranslation,
                        as: "translations",
                        required: true,
                        where: {
                            locale: global.lang,
                        }
                    },
                ]
            });
        }


        return ProjectDTO.transformDetailClient({ ...project, related });
    }

    public updateById = async (id: string, body) => {

        delete body.id;

        console.log(body);

        const t = await models.sequelize.transaction();

        return await models.Project.update({
            ...body,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
            banner: body.banner ? body.banner.id : null,
        }, { where: { id } }, { transaction: t }
        )
            .then(async (res) => {

                try {
                    await models.ProjectBranch.destroy({ where: { project_id: id } }, { transaction: t });
                    for (const branchId of body.branchs) {

                        await models.ProjectBranch.create({
                            project_id: id,
                            branch_id: branchId
                        }, { transaction: t });
                    }

                    await models.ProjectService.destroy({ where: { project_id: id } }, { transaction: t });

                    for (const serviceId of body.services) {
                        await models.ProjectService.create({
                            project_id: id,
                            service_id: serviceId
                        }, { transaction: t });
                    }

                    await models.ProjectTranslation.update({ ...body },
                        {
                            where: {
                                project_id: id,
                                locale: global.lang
                            },
                            individualHooks: true,
                        }, { transaction: t }
                    );
                } catch (error) {
                    console.log(error);
                    await t.rollback();
                }

                await t.commit();
            }).catch(async (error) => {
                await t.rollback();
            });
    }

    public deleteById = async (id: string) => {
        return await models.Project.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids: []) => {
        return await models.Project.destroy({ where: { id: ids } })
    }
}