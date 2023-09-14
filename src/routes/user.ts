import { Router } from "express";

import UserHandler from "../controllers/UserController";
import verifyToken from "../midlewares/verifyToken";

const userHandler = new UserHandler();

const router = Router();

// Routes users
router.post("/", verifyToken, userHandler.createUser);
router.get("/", verifyToken, userHandler.getUsers);
router.get("/currentuser", verifyToken, userHandler.currentUser);
router.get("/:dni", verifyToken, userHandler.getUser);
router.put("/:dni", verifyToken, userHandler.updateUser);
router.delete("/:dni", verifyToken, userHandler.deleteUser);

// Patients
router.post("/patients", userHandler.createPatient);

// Dependents
router.post("/dependents", userHandler.createDependent);
router.get("/:userdni/dependents", userHandler.getUserDependent);
router.put("/dependents/:dependentId", userHandler.updateUserDependent);
export default router;
