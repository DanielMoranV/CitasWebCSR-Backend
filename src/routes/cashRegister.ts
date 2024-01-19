import { Router } from "express";
import CashRegisterHandler from "../controllers/CashRegisterController";

const cashRegisterHandler = new CashRegisterHandler();

const router = Router();

router.post("/", cashRegisterHandler.createCashRegister);
router.post(
  "/cashregistertransaction",
  cashRegisterHandler.createCashRegisterTransaction
);
router.get("/", cashRegisterHandler.getCashRegisters);
router.get("/:cashRegisterId", cashRegisterHandler.getcashRegister);
router.put("/:cashRegisterId", cashRegisterHandler.updateCashRegister);
router.get(
  "/todayforadmissionist/:admissionistId",
  cashRegisterHandler.getTodayCashRegisterForAdmissionist
);
router.get("/bydate/:date", cashRegisterHandler.getByDateCashRegister);
router.get(
  "/previousforadmissionist/:admissionistId",
  cashRegisterHandler.getPreviousCashRegisterForAdmissionist
);
router.get(
  "/sumIngressAmountByCashRegisterId/:cashRegisterId",
  cashRegisterHandler.sumIngressAmountByCashRegisterId
);
router.get(
  "/admissionist/:admissionistId",
  cashRegisterHandler.getCashRegisterForAdmissionist
);
export default router;
