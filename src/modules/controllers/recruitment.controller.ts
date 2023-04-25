
import { NextFunction, Request, Response } from 'express';
import { BaseController } from "./base.controller";
import { ContactService } from '../../services/contact.service';

const contact = new ContactService();

export class RecruitmentController extends BaseController {

    public index = async (req: any, res: Response, next: NextFunction) => {
        try {
            const data = await contact.index(req.query);
            return this.success(res, data);
        } catch (error) {
            console.log(error);
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await contact.store({ ...req.body });
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
                const data = await contact.findById(id);
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
            const data = await contact.updateById(id, req.body);
            return this.success(res, data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public deleteMultipleIds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.body;
            const data = await contact.deleteMultipleIds(ids);
            return this.success(res, data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await contact.deleteById(req.params.id);
            return this.success(res, data);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}