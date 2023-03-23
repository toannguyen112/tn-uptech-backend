import { Router } from "express";
import FolderController from "../../../controllers/folder/folder.controller";

const folderRoute = Router();

folderRoute.get("/folders/index", FolderController.index);
folderRoute.get("/folders/show/:id", FolderController.show);
folderRoute.post("/folders/store", FolderController.store);

export { folderRoute };
