import { Request, Response } from "express";
import models from "../../infra/sequelize/models";
import { Container } from 'typedi';
import { BaseController } from "./base.controller";
import { MediaService } from "../../services/media.service";
export class MediaController extends BaseController {

  public media = Container.get(MediaService);

  public index = async (req: Request, res: Response) => {
    const data = await this.media.getList();
    return res.status(200).json({ message: "OK", data });
  }

  public show = async (req: Request, res: Response) => { }

  public create = async (req: Request, res: Response) => {
    try {
      const images = req["files"];
      for await (const image of images) {
        await this.media.storeImage(image)
      }
      const data = await models.Media.findAll({});
      return res.status(200).json({ message: "OK", data });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }

  public delete = async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        await models.Project.destroy({ where: { id } });

        const data = await models.Project.findAll({});
        return res.status(200).json({ message: "success", data: data });
      } catch (error) {
        res.status(500).send(error);
      }
  }

}
