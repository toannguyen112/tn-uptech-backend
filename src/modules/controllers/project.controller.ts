
import { NextFunction, Request, Response } from 'express';
import models from '../../infra/sequelize/models';
import { Container } from 'typedi';
import { BaseController } from "./base.controller";
import { ProjectService } from '../../services/project.service';

export class ProjectController extends BaseController {

    public project = Container.get(ProjectService);

    public index = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const data = await this.project.getList({ ...req.query });
            return res.status(200).json({ message: "success", data });

        } catch (error) {
            console.log(error);
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {

        console.log(req.body);
        return;
        try {
            const data = await models.Project.create({ ...req.body });
            return res.status(200).json({ message: "success", data });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await models.Project.findOne({
                where: { id: req.params.id },
                include: [models.Media]
            });

            return res.status(200).json({ message: "success", data });
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

            return res.status(200).json({ message: "success", data });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public deleteMultipleIds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.body;
            await models.Project.destroy({ where: { id: ids } }).then((result) => {
                return res.status(200).json({ message: "success", data: result });
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
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