"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CashRegisterController_1 = __importDefault(require("../controllers/CashRegisterController"));
const cashRegisterHandler = new CashRegisterController_1.default();
const router = (0, express_1.Router)();
router.post("/", cashRegisterHandler.createCashRegister);
router.post("/cashregistertransaction", cashRegisterHandler.createCashRegisterTransaction);
router.get("/", cashRegisterHandler.getCashRegisters);
router.get("/:cashRegisterId", cashRegisterHandler.getcashRegister);
router.put("/:cashRegisterId", cashRegisterHandler.updateCashRegister);
router.get("/todayforadmissionist/:admissionistId", cashRegisterHandler.getTodayCashRegisterForAdmissionist);
router.get("/previousforadmissionist/:admissionistId", cashRegisterHandler.getPreviousCashRegisterForAdmissionist);
router.get("/sumIngressAmountByCashRegisterId/:cashRegisterId", cashRegisterHandler.sumIngressAmountByCashRegisterId);
router.get("/admissionist/:admissionistId", cashRegisterHandler.getCashRegisterForAdmissionist);
exports.default = router;
