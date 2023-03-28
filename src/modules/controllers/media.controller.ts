import { Request, Response } from "express";
import { Container } from 'typedi';
import { BaseController } from "./base.controller";
import { MediaService } from "../../services/media.service";
import models from "../../infra/sequelize/models";
export class MediaController extends BaseController {

  public media = Container.get(MediaService);

  public index = async (req: Request, res: Response) => {

    try {
      const data = await this.media.getList();
      return this.success(res, data, "success");

    } catch (error) {
      console.log(error);
    }


  }

  public create = async (req: Request, res: Response) => {
    try {
      const images = req["files"];
      const { folderId } = req.body;

      for await (const image of images) {
        await this.media.storeImage(image, folderId)
      }
      return this.success(res, {}, "success");
    } catch (error) {
      return res.status(500);
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await this.media.delete(id);
      return this.success(res, data, "success");
    } catch (error) {
      res.status(500).send(error);
    }
  }

}
