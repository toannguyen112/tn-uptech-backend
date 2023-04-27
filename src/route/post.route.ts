import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { PostController } from "../modules/controllers/post.controller";
export class PostRoute implements Routes {
    public path = '/posts';
    public router = Router();
    public post = new PostController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.post.index);
        this.router.get(`${this.path}/category/:category_slug`, this.post.getDataOfCategory);
        this.router.get(`${this.path}/getListFeatured`, this.post.getListFeatured);
        this.router.post(`${this.path}/create`, this.post.create);
        this.router.get(`${this.path}/show/:id`, this.post.show);
        this.router.put(`${this.path}/update/:id`, this.post.update);
        this.router.delete(`${this.path}/delete/:id(\\d+)`, this.post.delete);
    }
}