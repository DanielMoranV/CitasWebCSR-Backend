import { Router } from "express";

import CollaboratorHandler from "../controllers/CollaboratorController";
import verifyToken from "../midlewares/verifyToken";

const collaboratorHandler = new CollaboratorHandler();

const router = Router();

// Routes collaborators
router.post("/", verifyToken, collaboratorHandler.createCollaborator);
router.get("/", verifyToken, collaboratorHandler.getCollaborators);
router.get("/:dni", verifyToken, collaboratorHandler.getCollaborator);
router.put("/:dni", verifyToken, collaboratorHandler.updateCollaborator);
router.delete("/:dni", verifyToken, collaboratorHandler.deleteCollaborator);

export default router;
