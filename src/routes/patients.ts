import { Router } from "express";

import UserHandler from "../controllers/UserController";

const userHandler = new UserHandler();

const router = Router();

// Patients
router.post("/", userHandler.createPatient);
router.get("/", userHandler.getPatients);
export default router;
