import express from "express";
import { adminRoute } from "../../../../route/admin.route";
import { folderRoute } from "../../../../route/folder.route";
import { mediaRoute } from "../../../../route/media.route";
import projectRoute from "../../../../route/project.route";

const router = express.Router();

router.get("/", async (req, res) => res.json({ message: "OK", data: "xin chao" }));

router.use(adminRoute);
router.use(folderRoute);
router.use(projectRoute);
router.use(mediaRoute);

export { router };
