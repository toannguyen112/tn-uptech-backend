import { NextFunction, Request, Response } from "express";
import models from "../../infra/sequelize/models";
import { BaseController } from "./base.controller";
import { AdminService } from "../../services/admin.service";

const admin = new AdminService();
export default class AdminController extends BaseController {

    async index(req: Request, res: Response) {
        try {
            const data = await admin.getList(req.query);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async login(req: Request, res: Response) {
        try {
            return res.status(200).json("");
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    async regiser(req: Request, res: Response) {
        try {
            return res.status(200).json("");
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    async show(req: Request, res: Response) {
        try {
            const data = await admin.findById({ where: { id: req.params.id } });
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
           const data = await admin.update({ ...req.body }, { where: { id: req.params.id } });
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await admin.deleteById(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public deleteMultipleIds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.body;
            const data = await admin.deleteMultipleIds(ids);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error);
        }
    }
}
