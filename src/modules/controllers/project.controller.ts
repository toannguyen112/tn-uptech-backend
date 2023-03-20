import { Request, Response } from "express";
import Project from "../models/project.model";
import { Op } from "sequelize";
import { ApiFeatures } from "../../utils/ApiFeatures";
export default class ProjectController {

  async index(req: Request, res: Response) {
    const query = { ...req.query };
    const conditions = {};
    const objQuery = new ApiFeatures(query)
      .filter(conditions)
      .paginate()
      .paranoid()
      .getObjQuery();

    const { count, rows }: any = await Project.findAndCountAll(objQuery);

    const data = rows.map((item: Project) => item.transform(item));

    const result = {
      page: Number(query?.page) * 1,
      pageSize: Number(query?.page_size) * 1,
      pageCount: Math.ceil(count / Number(query?.page_size) * 1),
      totalItems: count || 0,
      data,
    };

    return res.status(200).json({ message: "success", data: result });
  }

  async create(req: Request, res: Response) {

    console.log(req.body);

    try {
      const data = await Project.create({ ...req.body });
      return res.status(200).json({ message: "success", data });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const data = await Project.findOne({
        where: { id: req.params.id }
      });

      const projectDetail = data.transform(data);
      return res.status(200).json({ message: "success", data: projectDetail });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const reqBody = req.body;

      const body = {
        "id": reqBody.id,
        "name": reqBody.name,
        "status": reqBody.status,
        "description": reqBody.description,
        "isFeatured": reqBody.isFeatured,
        "content": reqBody.content,
      }

      const data = await Project.update(body, { where: { id } });

      return res.status(200).json({ message: "success", data });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deleteMultipleIds(req: Request, res: Response) {
    try {
      const { ids } = req.body;
      await Project.destroy({ where: { id: ids } }).then((result) => {
        return res.status(200).json({ message: "success", data: result });
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Project.destroy({ where: { id } });

      const data = await Project.findAll({});
      return res.status(200).json({ message: "success", data: data });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
