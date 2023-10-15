"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const errormessagebycode_1 = require("../midlewares/errormessagebycode");
const response_1 = require("../utils/response");
const PaymentRepository_1 = require("../repository/PaymentRepository");
const mercadopago_1 = require("mercadopago");
class PaymentHandler {
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const accessToken = "TEST-1434385854084408-101107-f1bd79780b72fd9b683f774bf8ef0dec-204234147";
            const client = new mercadopago_1.MercadoPagoConfig({
                accessToken,
                options: {
                    timeout: 5000,
                    idempotencyKey: "abc",
                },
            });
            const payment = new mercadopago_1.Payment(client);
            console.log(data);
            try {
                const body = {
                    transaction_amount: data.transaction_amount,
                    token: data.token,
                    installments: data.installments,
                    issuer_id: data.issuer_id,
                    payment_method_id: data.payment_method_id,
                    payer: data.payer,
                };
                // Step 5: Make the request
                payment.create({ body }).then(console.log).catch(console.log);
                //const newPayment = await createPayment(data);
                const message = "Operación exitosa Registro Creado";
                //success({ res, data: newPayment, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    getPaymentId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointmentId = Number(req.params.appointmentId);
                const appointment = yield (0, PaymentRepository_1.getPaymentId)(appointmentId);
                const message = "Operación exitosa Lista de empleados";
                (0, response_1.success)({ res, data: appointment, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
}
exports.default = PaymentHandler;
