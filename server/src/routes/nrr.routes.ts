import { Router } from "express";
import { calculateNRRController } from "../controllers/nrr.controller";

const router = Router();

router.post("/calculate", calculateNRRController);

export default router;
