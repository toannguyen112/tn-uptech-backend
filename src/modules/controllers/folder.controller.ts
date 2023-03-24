import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { FolderService } from "../../services/folder.service";
import { Folder } from "../../interface/folder.interface";
import { BaseController } from '../controllers/base.controller'

export class FolderController extends BaseController {

  public folder = Container.get(FolderService);

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getTreeFolder: Folder[] = await this.folder.index();
      this.success(res, getTreeFolder,"success")
    } catch (error) {
      next(error);
    }
  }

  public show = async (req: Request, res: Response, next: NextFunction) => {

  }

  public create = async (req: Request, res: Response, next: NextFunction) => {

  }

  public delete = async (req: Request, res: Response, next: NextFunction) => {

  }
}
