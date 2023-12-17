"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = __importDefault(require("../midlewares/verifyToken"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const userHandler = new UserController_1.default();
const router = (0, express_1.Router)();
// Patients
router.get("/searchbydni/:dni", userHandler.searchbydni);
router.post("/", userHandler.createPatient);
router.get("/", verifyToken_1.default, userHandler.getPatients);
exports.default = router;
