import express from "express";
import { adminRoute } from "../../../../modules/infra/http/routes/admin.route";

const router = express.Router();

router.get("/", async (req, res) => res.json({ message: "OK", data: "xin chao" }));

router.use(adminRoute);

export { router };
