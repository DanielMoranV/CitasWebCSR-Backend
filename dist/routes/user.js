"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const verifyToken_1 = __importDefault(require("../midlewares/verifyToken"));
const userHandler = new UserController_1.default();
const router = (0, express_1.Router)();
// Routes users
router.post("/", verifyToken_1.default, userHandler.createUser);
router.get("/", verifyToken_1.default, userHandler.getUsers);
router.get("/currentuser", verifyToken_1.default, userHandler.currentUser);
router.get("/:dni", verifyToken_1.default, userHandler.getUser);
router.put("/:dni", verifyToken_1.default, userHandler.updateUser);
router.delete("/:dni", verifyToken_1.default, userHandler.deleteUser);
// Patients
router.post("/patients", userHandler.createPatients);
exports.default = router;
