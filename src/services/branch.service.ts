import { BranchDTO } from "../dtos/branch.dto";
import models from "../infra/sequelize/models";
import { ApiFeatures } from "../utils/ApiFeatures";
import { Op } from "sequelize";
export class BranchService {

    public getList = async (query) => {

        try {
            const conditions = {};

            const queryObject = {
                status: query.status,
                search: query.search,
            };

            const excludedFields = ["page", "page_size", "sort_field", "sort_order", "fields"];

            excludedFields.forEach((field) => delete queryObject[field]);

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
                        model: models.BranchTranslation,
                        as: "translations",
                        required: true,
                        where: queryTranslation
                    },
                ])
                .sort(query.sort_field || "createdAt", query.sort_order || "DESC")
                .paginate()
                .paranoid()
                .getObjQuery();

            const { count, rows }: any = await models.Branch.findAndCountAll(objQuery);

            const result = {
                page: Number(query?.page) * 1,
                pageSize: Number(query?.page_size) * 1,
                pageCount: Math.ceil(count / Number(query?.page_size) * 1),
                totalItems: count || 0,
                data: rows.map((item: any) => BranchDTO.transform(item)),
            };

            return result;
        } catch (error) {
            console.log(error);
        }
    }

    public store = async (body) => {

        return await models.Branch.create({
            ...body,
        }).then(async (branch: any) => {

            if (branch) {
                const branchId = branch.id;

                await models.BranchTranslation.create({
                    ...body,
                    branch_id: branchId,
                    locale: 'vi'
                });

                await models.BranchTranslation.create({
                    ...body,
                    branch_id: branchId,
                    locale: 'en'
                });
            }
        });
    }

    public findById = async (id: string | number) => {

        const branch = await models.Branch.findOne({
            where: { id },
            include: [
                {
                    model: models.BranchTranslation,
                    as: "translations",
                    required: true,
                    where: {
                        locale: global.lang,
                        branch_id: id,
                    }
                },
            ]
        });

        return BranchDTO.transformDetail(branch);
    }

    public updateById = async (id: string, body) => {

        return await models.Branch.update({
            status: body.status,
        }, { where: { id } },
        )
            .then(async (res) => {
                await this.handleUpdate({ branch_id: id, lang: global.lang, body });
            });
    }

    public handleUpdate = async ({ branch_id, lang = "vi", body }) => {

        try {
            return await models.BranchTranslation.update({ name: body.name },
                {
                    where: {
                        branch_id,
                        locale: lang
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    public deleteById = async (id: string) => {
        return await models.Branch.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids: []) => {
        return await models.Branch.destroy({ where: { id: ids } })
    }
}