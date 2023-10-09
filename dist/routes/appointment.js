"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AppointmentController_1 = __importDefault(require("../controllers/AppointmentController"));
const appointmentHandler = new AppointmentController_1.default();
const router = (0, express_1.Router)();
router.post("/", appointmentHandler.createAppointment);
router.get("/:appointmentId", appointmentHandler.getAppointmentId);
exports.default = router;
