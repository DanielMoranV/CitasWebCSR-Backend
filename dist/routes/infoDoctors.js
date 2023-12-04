"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InfoDoctorsController_1 = __importDefault(require("../controllers/InfoDoctorsController"));
const infoDoctorsHandler = new InfoDoctorsController_1.default();
const router = (0, express_1.Router)();
// infodoctors
router.get("/", infoDoctorsHandler.getInfoDoctors);
router.get("/:cmp", infoDoctorsHandler.getInfoDoctor);
exports.default = router;
