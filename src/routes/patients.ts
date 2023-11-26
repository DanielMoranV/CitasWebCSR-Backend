import { Router } from "express";
import verifyToken from "../midlewares/verifyToken";

import UserHandler from "../controllers/UserController";

const userHandler = new UserHandler();

const router = Router();

// Patients

router.get("/searchbydni/:dni", userHandler.searchbydni);
router.post("/", verifyToken, userHandler.createPatient);
router.get("/", verifyToken, userHandler.getPatients);
export default router;
