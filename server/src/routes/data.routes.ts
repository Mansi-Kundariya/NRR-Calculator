import { Router } from "express";
import { getPointsTableController } from "../controllers/pointTable.controller";

const router = Router();

router.post("/", getPointsTableController);

export default router;
