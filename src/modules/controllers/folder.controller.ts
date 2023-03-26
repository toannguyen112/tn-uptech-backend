import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { FolderService } from "../../services/folder.service";
import { Folder } from "../../interface/folder.interface";
import { Media } from "../../interface/media.interface";
import { BaseController } from '../controllers/base.controller'

export class FolderController extends BaseController {

  public folder = Container.get(FolderService);

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getTreeFolder: Folder[] = await this.folder.index();
      this.success(res, getTreeFolder, "success");
    } catch (error) {
      next(error);
    }
  }

  public getMedias = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const folderId = req.body.folderId;
      const data: Media[] = await this.folder.getMeidas(folderId);
      this.success(res, data, "success");
    } catch (error) {
      next(error);
    }
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newfolder = await await this.folder.create(req.body);
      this.success(res, newfolder, "success");
    } catch (error) {
      next(error);
    }
  }

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await await this.folder.delete(req.params.id);
      this.success(res, data, "success");
    } catch (error) {
      next(error);
    }
  }
}
