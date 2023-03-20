import { Request, Response } from "express";

export default class RoleController {
    async index(req: Request, res: Response) {

    }

    async create(req: Request, res: Response) {


    }

    async delete(req: Request, res: Response) {
        return res.status(200).json('home');
    }

    async show(req: Request, res: Response) {

    }

    async update(req: Request, res: Response) {

    }
}
