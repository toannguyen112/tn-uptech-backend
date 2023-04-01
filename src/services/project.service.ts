import models from "../infra/sequelize/models";
import { ApiFeatures } from "../utils/ApiFeatures";
import { ProjectDTO } from "../dtos/project.dto";

export class ProjectService {

    public getList = async (query) => {
        const conditions = {};

        const objQuery = new ApiFeatures(query)
            .filter(conditions)
            .includes([
                {
                    model: models.Media,
                    as: "image"
                },
                {
                    model: models.ProjectTranslation,
                    as: "translations",
                    required: true,
                    where: {
                        locale: "vi",
                    }
                },
            ])
            .paginate()
            .paranoid()
            .getObjQuery();

        const { count, rows }: any = await models.Project.findAndCountAll(objQuery);

        const transformData = rows.map((item) => {
            return ProjectDTO.transform(item);
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

        return await models.Project.create({
            ...body,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
            banner: body.banner ? body.banner.id : null,
        }).then(async (project: any) => {

            const projectId = project.id;

            await models.ProjectTranslation.create({
                ...body,
                project_id: projectId,
                locale: 'vi'
            });

            await models.ProjectTranslation.create({
                ...body,
                project_id: projectId,
                locale: 'en'
            });
        });
    }

    public findById = async (id: string | number) => {
        const res = await models.Project.findOne({
            where: {
                id: id,
                status: 'active',
            },
            include: [
                {
                    model: models.Media,
                    as: "image",
                    required: false,
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
                        locale: "vi",
                        project_id: id,
                    }
                },
            ]
        });

        let related: [];

        await models.ProjectRelated.findAll({
            where: {
                project_id: id
            },
            include: {
                model: models.Project,
                as: "project",
                required: false,
                include: {
                    model: models.ProjectTranslation,
                    as: "translations",
                    required: false,
                    where: {
                        locale: "vi",
                        project_id: id
                    }
                },
            },
        }).then(function (projects) {
            related = projects.map((item: any) => {
                return ProjectDTO.transform(item.project);
            })
        })

        return ProjectDTO.transformDetail({ ...res, related });
    }

    public updateById = async (id: string, body) => {
        return await models.Project.update({
            ...body,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
            banner: body.banner ? body.banner.id : null,
        }, { where: { id } });
    }

    public deleteById = async (id: string) => {
        return await models.Project.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids: []) => {
        return await models.Project.destroy({ where: { id: ids } })
    }
}