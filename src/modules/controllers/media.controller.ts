import { Request, Response, NextFunction } from "express";
import { BaseController } from "./base.controller";
import { MediaService } from "../../services/media.service";

const media = new MediaService();
export class MediaController extends BaseController {

  public index = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const data = await media.getList();
      return this.success(res, data, "success");
    } catch (error) {
      console.log(error);
    }
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const images = req["files"];

      for (const image of images) {
        await media.storeImage(image, req.body.folderId)
      }
      return this.success(res, {}, "success");
    } catch (error) {
      return res.status(500);
    }
  }

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await media.delete(req.params.id);
      return this.success(res, data, "success");
    } catch (error) {
      res.status(500).send(error);
    }
  }

}
