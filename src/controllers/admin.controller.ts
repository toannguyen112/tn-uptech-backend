import Admin from "../models/admin.model";
import { Request, Response } from "express";
export default class AdminController {

  async index(req: Request, res: Response) {
    const data = await Admin.findAll({});
    return res.json(data).status(200);
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const data = await Admin.findOne({
        where: { id }, include: [],
      });

      return res.status(200).json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response) {
    await Admin.update({ ...req.body }, { where: { id: req.params.id } })
    const admin = await Admin.findAll({})
    return res.status(200).json(admin);
  }

  async login(req: Request, res: Response) {
    return new Admin().login(req, res);
  }

  async logout(req: Request, res: Response) {
    return new Admin().logout(req, res);
  }

}
