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
                    as: "image",
                    required: false,
                },
                {
                    model: models.ProjectTranslation,
                    as: "translations",
                    required: false,
                    where: { locale: "vi" }
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
        })
            .then(async (project: any) => {

                if (project) {
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
                }
            });
    }

    public findById = async (id: string | number) => {

        const project = await models.Project.findOne({
            where: {
                id: id,
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

        return ProjectDTO.transformDetail(project);
    }

    public updateById = async (id: string, body) => {

        return await models.Project.update({
            related: body.related,
            status: body.status,
            images: body.images,
            isFeatured: body.isFeatured,
            thumbnail: body.thumbnail ? body.thumbnail.id : null,
            banner: body.banner ? body.banner.id : null,
        },
            { where: { id } })
            .then(async (res) => {

                if (res) {
                    await this.handleUpdate({ project_id: id, lang: "vi", body });
                    await this.handleUpdate({ project_id: id, lang: "en", body });
                }
            });
    }

    public handleUpdate = async ({ project_id, lang = "vi", body }) => {

        try {
            return await models.ProjectTranslation.update({
                name: body.name,
                content: body.content,
                description: body.description,
                slug: body.slug,
                custom_slug: body.custom_slug,
            },
                {
                    where: {
                        project_id,
                        locale: lang
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    public deleteById = async (id: string) => {
        return await models.Project.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids: []) => {
        return await models.Project.destroy({ where: { id: ids } })
    }
}