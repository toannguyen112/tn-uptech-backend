import { NextFunction, Request, Response } from 'express';
import { CategoryService } from '../../services/categories.service';
import { logger } from '../../utils/logger';

const category = new CategoryService();

export class CategoryController {

    public async index(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await category.getList(req.query);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(JSON.stringify(error));
            res.status(500).send(error.message);
        }
    }

    public async getListCategories(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await category.getListCategories();
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await await category.store(req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(JSON.stringify(error));
            res.status(500).send(error.message);
        }
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await category.findById(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error);

            res.status(500).send(error.message);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await category.updateById(id, req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error);
            logger.error(JSON.stringify(error));
            res.status(500).send(error.message);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await category.deleteById(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(JSON.stringify(error));
            res.status(500).send(error.message);
        }
    }

    public deleteMultipleIds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.body;
            const data = await category.deleteMultipleIds(ids);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(JSON.stringify(error));
            res.status(500).send(error);
        }
    }

}
