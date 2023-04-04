import { NextFunction, Request, Response } from 'express';
import { BaseController } from "./base.controller";
import { PostService } from "../../services/post.service";

const post = new PostService();
export class PostController extends BaseController {

    public async index(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await post.getList(req.query);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await await post.store(req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await post.findById(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await post.update(id, req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await post.delete(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
