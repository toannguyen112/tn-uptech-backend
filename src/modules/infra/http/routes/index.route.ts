import { Router } from "express";
import HomeController from "../modules/controllers/home.controller";

const route: Router = Router();

route.get("/", new HomeController().index);

export default route;
