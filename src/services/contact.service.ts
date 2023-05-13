
import { ApiFeatures } from "../utils/ApiFeatures";
import { Op } from "sequelize";
import { logger } from "../utils/logger";
import models from "../infra/sequelize/models";
import { ContactDTO } from "../dtos/contact.dtos";

export class ContactService {

    public index = async (query) => {
        try {
            const conditions = {};
            const queryObject = {
                status: query.status,
                search: query.search,
            };

            console.log(queryObject);

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

            const objQuery = new ApiFeatures(query)
                .filter(conditions)
                .includes([
                    {
                        model: models.Media,
                        as: "file",
                        required: false,
                    },
                ])
                .sort(query.sort_field || "createdAt", query.sort_order || "DESC")
                .paginate()
                .paranoid()
                .getObjQuery();

            const { count, rows }: any = await models.Contact.findAndCountAll(objQuery);

            const result = {
                page: Number(query?.page) * 1,
                pageSize: Number(query?.page_size) * 1,
                pageCount: Math.ceil(count / Number(query?.page_size) * 1),
                totalItems: count || 0,
                data: rows.map((item: any) => ContactDTO.transform(item)),
            };

            return result;

        } catch (error) {
            console.log(error);
            logger.error(JSON.stringify(error));
        }
    }

    public store = async (body) => {
        let data;
        try {
            if (body.type === 'contact') {
                data = await models.Contact.create({ ...body });
            }

            if (body.type === 'recruitment') {
                const newItem = {
                    name: body.name,
                    email: body.email,
                    type: body.type,
                    status: body.status,
                    phone: body.phone,
                    note: body.note,
                }

                data = await models.Contact.create(newItem);
            }

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    public show = async (id) => {

        const data = await models.Contact.findOne({
            where: { id },
            include: [
                {
                    model: models.Media,
                    as: "file",
                    required: false,
                },
            ]
        });

        return ContactDTO.transformDetail(data);
    }

    public update = async (id, body) => {
        return await models.Contact.update({ ...body }, { where: { id }, })
    }

    public deleteById = async (id) => {
        return await models.Contact.destroy({ where: { id } });
    }

    public deleteMultipleIds = async (ids) => {
        return await models.Contact.destroy({ where: { id: ids } });
    }
}