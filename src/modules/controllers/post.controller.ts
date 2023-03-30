import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { BaseController } from "./base.controller";
import { PostService } from "../../services/post.service";

const post = new PostService();
export class PostController extends BaseController {

    public async index(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await post.getList({ ...req.query });
            return res.status(200).json({ message: "success", data });
        } catch (error) {
            console.log(error);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await await post.store(req.body);
            return res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await post.show(req.params.id);
            return res.status(200).json({ message: "success", data });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await post.update(id, req.body);
            return res.status(200).json({ message: "OK", data });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await post.delete(id);
            return res.status(200).json({ message: "OK", data: "" });
        } catch (error) {
            res.status(500).send(error);
        }
    }
}
