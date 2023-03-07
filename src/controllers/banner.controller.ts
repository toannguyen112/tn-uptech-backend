import { Request, Response } from "express";
import Banner from "../models/banner.model";
export default class BannerController {

  async index(req: Request, res: Response) {
    try {
      const data = await Banner.findAll({});
      return res.status(200).json({ message: "success", data });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = await Banner.create(req.body);
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, body } = req.params;
      const data = await Banner.update(
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
      await Banner.destroy({ where: { id } });

      const data = await Banner.findAll({});
      return res.status(200).json({ message: "OK", data: data });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
