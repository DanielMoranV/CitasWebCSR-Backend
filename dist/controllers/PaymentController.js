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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errormessagebycode_1 = require("../midlewares/errormessagebycode");
const response_1 = require("../utils/response");
const PaymentRepository_1 = require("../repository/PaymentRepository");
const culqi_node_1 = __importDefault(require("culqi-node"));
const accessToken = process.env.ACCESS_TOKEN_CULQUI;
const culqi = new culqi_node_1.default({
    privateKey: accessToken,
});
class PaymentHandler {
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const charge = yield culqi.charges.createCharge({
                    amount: data.metadata.amount,
                    currency_code: "PEN",
                    email: data.email,
                    source_id: data.id,
                    antifraud_details: {
                        address: data.client.address,
                        address_city: data.client.address,
                        country_code: "PE",
                        first_name: data.client.name,
                        last_name: data.client.surnames,
                        phone: data.client.phone,
                    },
                });
                if (charge.id) {
                    data.metadata.chargeId = charge.id;
                    const newPayment = yield (0, PaymentRepository_1.createPayment)(data.metadata);
                    const message = "Operación exitosa Registro Creado";
                    (0, response_1.success)({ res, data: newPayment, message });
                }
            }
            catch (error) {
                console.log(error);
                if (error.code) {
                    const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                    (0, response_1.failure)({ res, message });
                }
                else {
                    const message = error.user_message;
                    console.log(message);
                    (0, response_1.failure)({ res, message });
                }
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
