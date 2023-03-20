import AdminController from "../../../controllers/admin/admin.controller";
import express from "express";

const adminRoute = express.Router();

adminRoute.get("/admin/index", new AdminController().index);
adminRoute.get("/admin/show/:id", new AdminController().show);
adminRoute.put("/admin/update/:id", new AdminController().update);

export { adminRoute };
