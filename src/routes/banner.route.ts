import { Router } from "express";
import BannerController from "../controllers/banner.controller";
const route: Router = Router();

route.get("/banners/index", new BannerController().index);
route.post("/banners/create", new BannerController().create);
route.post("/banners/update/:id", new BannerController().update);
route.post("/banners/delete/:id", new BannerController().update);

export default route;
