import { Router } from "express";
import verifyToken from "../midlewares/verifyToken";
import AccesHandler from "../controllers/AccessController";

const accesHandler = new AccesHandler();

const router = Router();

// Routes users
router.post("/:username", accesHandler.createAccessUser);
router.post("/", accesHandler.loginUser);
router.get("/", verifyToken, accesHandler.getAccess);
router.get("/:username", verifyToken, accesHandler.getAccessUser);
router.put("/:username", verifyToken, accesHandler.updateAccess);
router.put("/accessId/:accessId", verifyToken, accesHandler.updateAccessId);

//router.delete("/:dni", accesHandler.deleteUser);

export default router;
