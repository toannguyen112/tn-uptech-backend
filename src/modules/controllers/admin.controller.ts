import { NextFunction, Request, Response } from "express";
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
            const data = await admin.login({ ...req.body });
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send({ message: error.message, data: null })
        }
    }

    async regiser(req: Request, res: Response) {
        try {
            return res.status(200).json("");
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message, data: null })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const data = await admin.findById(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message, data: null })
        }
    }

    async profile(req, res: Response) {
        const { id } = req.admin;
        try {
            const data = await admin.profile(id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send({ message: error.message, data: null })
        }
    }

    async logout(req, res): Promise<any> {
        try {
            req.admin.tokens = req.admin.tokens.filter((item: any) => { return item.token !== req.token; });
            await req.admin.save();
            res.status(200).send({ message: "Logout successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message, data: null })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = await admin.create({ ...req.body });
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message, data: null })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const data = await admin.update({ ...req.body, id: req.params.id });
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message, data: null })
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
}
