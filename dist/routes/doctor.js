"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DoctorController_1 = __importDefault(require("../controllers/DoctorController"));
const doctorsHandler = new DoctorController_1.default();
const router = (0, express_1.Router)();
// Routes users
router.get("/", doctorsHandler.getDoctors);
exports.default = router;
