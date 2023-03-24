import { Request, Response } from "express";
import Post from "../models/post.model";
import { Op } from "sequelize";
import { ApiFeatures } from "../../utils/apiFeatures";
import File from "../models/file.model";
export default class PostController {

  async index(req: Request, res: Response) {

    const query = { ...req.query };

    const queryObject = {
      status: req.query.status,
    };

    const conditions = {};
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
          const status = typeof arrQueryObject[index].value === "string" ? [arrQueryObject[index].value] : arrQueryObject[index].value;
          if (Array.isArray(status)) {
            conditions["status"] = {
              [Op.in]: status,
            };
          }
          break;

        default:
          break;
      }
    }

    const objQuery = new ApiFeatures(query)
      .filter(conditions)
      .limitFields()
      .includes([File])
      .paginate()
      .paranoid()
      .getObjQuery();

    const { count, rows }: any = await Post.findAndCountAll(objQuery);

    const data = rows.map((item: any) => Post.transform(item));

    const result = {
      page: Number(query?.page) * 1,
      pageSize: Number(query?.page_size) * 1,
      pageCount: Math.ceil(count / Number(query?.page_size) * 1),
      totalItems: count || 0,
      data: data,
    };

    return res.status(200)
      .json({ message: "success", data: result });
  }

  async create(req: Request, res: Response) {

    try {
      const data = await Post.create(req.body);
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const data = await Post.findOne({
        where: {
          id: req.params.id
        },
        include: [File]
      });

      return res.status(200).json({ message: "success", data: data });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await Post.update(req.body, { where: { id } });
      return res.status(200).json({ message: "OK", data });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Post.destroy({ where: { id } });
      const data = await Post.findAll({});
      return res.status(200).json({ message: "OK", data: data });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
