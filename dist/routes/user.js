"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const userHandler = new UserController_1.default();
const router = (0, express_1.Router)();
// Routes users
router.post("/", userHandler.createUser);
router.get("/", userHandler.getUsers);
router.get("/currentuser", userHandler.currentUser);
router.get("/:dni", userHandler.getUser);
router.put("/:dni", userHandler.updateUser);
router.delete("/:dni", userHandler.deleteUser);
exports.default = router;
