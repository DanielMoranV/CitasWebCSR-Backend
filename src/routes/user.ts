import { Router } from "express";

import UserHandler from "../controllers/UserController";

const userHandler = new UserHandler();

const router = Router();

// Routes users
router.post("/", userHandler.createUser);
router.get("/", userHandler.getUsers);
router.get("/currentuser", userHandler.currentUser);
router.get("/:dni", userHandler.getUser);
router.put("/:dni", userHandler.updateUser);
router.delete("/:dni", userHandler.deleteUser);

export default router;
