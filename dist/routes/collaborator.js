"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CollaboratorController_1 = __importDefault(require("../controllers/CollaboratorController"));
const verifyToken_1 = __importDefault(require("../midlewares/verifyToken"));
const collaboratorHandler = new CollaboratorController_1.default();
const router = (0, express_1.Router)();
// Routes collaborators
router.post("/", verifyToken_1.default, collaboratorHandler.createCollaborator);
router.get("/", verifyToken_1.default, collaboratorHandler.getCollaborators);
router.get("/:dni", verifyToken_1.default, collaboratorHandler.getCollaborator);
router.put("/:dni", verifyToken_1.default, collaboratorHandler.updateCollaborator);
router.delete("/:dni", verifyToken_1.default, collaboratorHandler.deleteCollaborator);
exports.default = router;
