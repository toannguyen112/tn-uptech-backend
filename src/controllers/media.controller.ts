import { Request, Response } from "express";
import File from "../models/file.model";
import { ApiFeatures } from "../utils/ApiFeatures";

export default class MediaController {
  async index(req: Request, res: Response) {
    try {

      const query = { ...req.query };

      const objQuery = new ApiFeatures(query)
        .limitFields()
        .paginate()
        .getObjQuery();

      const { count }: any = await File.findAndCountAll(objQuery);

      const data = {
        page: Number(query?.page) * 1,
        pageSize: Number(query?.page_size) * 1,
        pageCount: Math.ceil(count / Number(query?.page_size) * 1),
        totalItems: count || 0,
      };

      return res.status(200).json({ message: "OK", data });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const data = await File.findOne({
        where: {
          id: req.params.id
        },
      });
      return res.status(200).json({ message: "OK", data });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async store(req: Request, res: Response) {
    const images = req["files"];

    for await (const image of images) {
      await File.storeMedia(image)
    }
    const data = await File.findAll({});
    return res.status(200).json({ message: "OK", data });
  }

  async delete(req: Request, res: Response) {
    const data = await File.destroy({ where: { id: req.params.id } })
    if (data) return res.status(200).json({
      message: "Remove File Success",
    })
  }

}
