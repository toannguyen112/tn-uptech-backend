import { NextFunction, Request, Response } from 'express';
import { BaseController } from "./base.controller";
import { PostService } from "../../services/post.service";
import { logger } from '../../utils/logger';
import models from '../../infra/sequelize/models';

const post = new PostService();

export class PostController extends BaseController {

    public async index(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await post.getList(req.query);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    public async getPageAll(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await post.getPageAll();
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    public async getDataOfCategory(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await post.getDataOfCategory(req.params.category_slug);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    public async getListFeatured(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await post.getListFeatured();
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await await post.store(req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    public async increaseView(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await models.Post.increment(['view', 1], { where: { id: req.body.id } });
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await post.show(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error);
        }
    }

    public async findByIdClient(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await post.findByIdClient(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await post.updateById(id, req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await post.deleteById(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }
}
