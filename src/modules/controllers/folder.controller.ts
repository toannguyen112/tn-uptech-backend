import { NextFunction, Request, Response } from 'express';
import { Folder } from "../../interface/folder.interface";
import { Media } from "../../interface/media.interface";
import { BaseController } from '../controllers/base.controller'
import { FolderService } from '../../services/folder.service';

const folder = new FolderService();
export class FolderController extends BaseController {

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getTreeFolder: Folder[] = await folder.index();
      this.success(res, getTreeFolder, "success");
    } catch (error) {
      next(error);
    }
  }

  public getMedias = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const folderId = req.body.folderId;
      const data: Media[] = await folder.getMeidas(folderId);
      this.success(res, data, "success");
    } catch (error) {
      next(error);
    }
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newfolder = await await folder.create(req.body);
      this.success(res, newfolder, "success");
    } catch (error) {
      next(error);
    }
  }

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await await folder.delete(req.params.id);
      this.success(res, data, "success");
    } catch (error) {
      next(error);
    }
  }
}
