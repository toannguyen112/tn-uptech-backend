import models from "../infra/sequelize/models";
import { Service } from 'typedi';
import { ApiFeatures } from "../utils/apiFeatures";

@Service()
export class ProjectService {

    public getList = async (query) => {
        try {
            const conditions = {};
            const objQuery = new ApiFeatures(query)
                .filter(conditions)
                .paginate()
                .paranoid()
                .getObjQuery();

            const { count, rows }: any = await models.Project.findAndCountAll(objQuery);

            const result = {
                page: Number(query?.page) * 1,
                pageSize: Number(query?.page_size) * 1,
                pageCount: Math.ceil(count / Number(query?.page_size) * 1),
                totalItems: count || 0,
                data: rows,
            };

            return result;

        } catch (error) {
            console.log(error);
        }
    }

}