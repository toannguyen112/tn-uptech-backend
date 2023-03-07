import { Request, Response } from "express";
import Skill from "../models/skill.model";
import { Op } from "sequelize";
import { ApiFeatures } from "../utils/ApiFeatures";
export default class SkillController {

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
      .paginate()
      .paranoid()
      .getObjQuery();

    const { count, rows }: any = await Skill.findAndCountAll(objQuery);

    const result = {
      page: Number(query?.page) * 1,
      pageSize: Number(query?.page_size) * 1,
      pageCount: Math.ceil(count / Number(query?.page_size) * 1),
      totalItems: count || 0,
      data: rows,
    };

    return res.status(200)
      .json({ message: "success", data: result });
  }


  async getLists(req: Request, res: Response) {
    try {
      const data = await Skill.findAll({});
      return res.status(200).json({
        message: "success",
        data: data
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = await Skill.create(req.body);
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, body } = req.params;
      const data = await Skill.update(
        { body }, { where: { id } }
      );

      return res.status(200).json({ message: "OK", data });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Skill.destroy({ where: { id } });

      const data = await Skill.findAll({});
      return res.status(200).json({ message: "OK", data: data });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
