import { Request, Response } from "express";
import models from "../../infra/sequelize/models";
import { BaseController } from "./base.controller";
export class MediaController extends BaseController {

  public index = async (req: Request, res: Response) => {
    const data = await models.Media.findAll({});
    return res.status(200).json({ message: "OK", data });
  }

  public show = async (req: Request, res: Response) => {

  }

  public create = async (req: Request, res: Response) => {

    const images = req["files"];

    for await (const image of images) {
      await models.Media.storeMedia(image)
    }
    const data = await models.Media.findAll({});
    return res.status(200).json({ message: "OK", data });
  }

  public delete = async (req: Request, res: Response) => {

  }

}
