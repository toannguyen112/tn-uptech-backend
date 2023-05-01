
import { NextFunction, Request, Response } from 'express';
import { BaseController } from "./base.controller";
import { ProjectService } from '../../services/project.service';

const project = new ProjectService();
export class ProjectController extends BaseController {

    public index = async (req: any, res: Response, next: NextFunction) => {
        try {
            const data = await project.getList(req.query);
            return this.success(res, data);
        } catch (error) {
            console.log(error);
        }
    }

    public getProjectsClient = async (req: any, res: Response, next: NextFunction) => {
        try {
            const data = await project.getProjectsClient(req.query);
            return this.success(res, data);
        } catch (error) {
            console.log(error);
        }
    }
    public findByIdClient = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            
            const data = await project.findByIdClient(id);
            return this.success(res, data);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
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

    public show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            try {
                const data = await project.findById(id);
                return this.success(res, data);
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = await project.updateById(id, req.body);
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