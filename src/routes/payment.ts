import { Router } from "express";
import PaymentHandler from "../controllers/PaymentController";

const paymentHandler = new PaymentHandler();

const router = Router();

router.post("/", paymentHandler.createPayment);
router.post("/cash", paymentHandler.createPaymentCash);
router.get("/lastpayment", paymentHandler.getLastPayment);

export default router;
