
import { Router } from "express";
import { Routes } from "../interface/routes.interface";

export class CategoryRoute implements Routes {
    public path = '/categories';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

    }
}