
import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { CategoryController } from "../modules/controllers/categories.controller";
export class CategoryRoute implements Routes {
    public path = '/categories';
    public router = Router();
    public category = new CategoryController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.category.index);
        this.router.get(`${this.path}/getListCategories`, this.category.getListCategories);
        this.router.post(`${this.path}/create`, this.category.create);
        this.router.get(`${this.path}/show/:id`, this.category.show);
        this.router.put(`${this.path}/update/:id`, this.category.update);
        this.router.delete(`${this.path}/delete/:id(\\d+)`, this.category.delete);
    }
}