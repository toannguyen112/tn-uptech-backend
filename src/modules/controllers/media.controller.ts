import { Request, Response } from "express";
import models from "../../infra/sequelize/models";
import { BaseController } from "./base.controller";
export class MediaController extends BaseController {

 public  index = async (req: Request, res: Response) => {

  }

  public show = async (req: Request, res: Response) => {

  }

  public create = async (req: Request, res: Response) => {
    const images = req["files"];

    for await (const image of images) {
      await models.File.storeMedia(image)
    }
    const data = await models.File.findAll({});
    return res.status(200).json({ message: "OK", data });
  }

  public delete = async (req: Request, res: Response) => {

  }

}
