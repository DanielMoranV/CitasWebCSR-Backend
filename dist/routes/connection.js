"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ConnectionController_1 = __importDefault(require("../controllers/ConnectionController"));
const connectionHandler = new ConnectionController_1.default();
const router = (0, express_1.Router)();
// infodoctors
router.get("/wp", connectionHandler.isConnectionAvailableWp);
exports.default = router;
