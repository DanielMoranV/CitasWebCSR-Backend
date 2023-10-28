import { Router } from "express";
import PaymentHandler from "../controllers/PaymentController";

const paymentHandler = new PaymentHandler();

const router = Router();

router.post("/", paymentHandler.createPayment);
//router.get("/:paymentId", paymentHandler.getPaymentId);

export default router;
