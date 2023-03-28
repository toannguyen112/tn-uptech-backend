
import { NextFunction, Request, Response } from 'express';
import models from '../../infra/sequelize/models';
import { BaseController } from "./base.controller";
import { ProjectService } from '../../services/project.service';

const project = new ProjectService();
export class ProjectController extends BaseController {

    public index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await project.getList({ ...req.query });
            return this.success(res, data);
        } catch (error) {
            console.log(error);
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await project.store({ ...req.body });
            return this.success(res, data);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    public transform = (item) => {
        return {
            "id": item.id,
            "name": item.name,
            "status": item.status,
            "description": item.description,
            "isFeatured": item.isFeatured,
            "content": item.content,
            "thumbnail": item.image,
            "banner": item.banner_image,
        }
    }

    public show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await project.findById(req.params.id);
            return this.success(res, this.transform(data));
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const reqBody = req.body;

            const body = {
                "id": reqBody.id,
                "name": reqBody.name,
                "status": reqBody.status,
                "description": reqBody.description,
                "isFeatured": reqBody.isFeatured,
                "content": reqBody.content,
            }

            const data = await models.Project.update(body, { where: { id } });
            return this.success(res, data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public deleteMultipleIds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.body;
            const data = await project.deleteMultipleIds(ids);
            return this.success(res, data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await project.deleteById(req.params.id);
            return this.success(res, data);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}