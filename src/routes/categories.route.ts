import { Router } from "express";
import CategoryController from "../controllers/categories.controller";

const route = Router();

route.get("/categories/index", new CategoryController().index);
route.post("/categories/create", new CategoryController().create);

export default route;
