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
exports.getLastPayment = exports.createPayment = exports.createPaymentCash = exports.createCharge = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
const axios_1 = __importDefault(require("axios"));
const CULQI_ACCESS_TOKEN = process.env.ACCESS_TOKEN_CULQUI;
function createCharge(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: "POST",
            url: "https://api.culqi.com/v2/charges",
            timeout: 5000,
            headers: {
                Authorization: `Bearer ${CULQI_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
            data: {
                amount: data.metadata.amount,
                currency_code: "PEN",
                email: data.email,
                source_id: data.id,
                antifraud_details: {
                    address: data.client.address,
                    address_city: "Piura",
                    country_code: "PE",
                    first_name: data.client.name,
                    last_name: data.client.surnames,
                    phone: data.client.phone,
                },
            },
        };
        const culqiResponse = yield (0, axios_1.default)(options);
        return culqiResponse;
    });
}
exports.createCharge = createCharge;
function createPaymentCash(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(data);
        return yield prisma_1.default.instance.payment.create({
            data: {
                amount: data.amount,
                paymentDate: data.paymentDate,
                voucherNumber: data.voucherNumber,
                chargeId: data.chargeId,
                Admissionist: {
                    connect: {
                        accessId: data.admissionistId,
                    },
                },
                User: {
                    connect: {
                        userId: data.userId,
                    },
                },
                appointment: {
                    connect: {
                        appointmentId: data.appointmentId,
                    },
                },
                paymentMethod: {
                    connect: {
                        paymentMethodId: data.paymentMethodId,
                    },
                },
                VoucherType: {
                    connect: {
                        VoucherTypeId: data.VoucherTypeId,
                    },
                },
            },
        });
    });
}
exports.createPaymentCash = createPaymentCash;
function createPayment(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.payment.create({
            data: {
                amount: data.amount,
                paymentDate: data.paymentDate,
                voucherNumber: data.voucherNumber,
                chargeId: data.chargeId,
                User: {
                    connect: {
                        userId: data.userId,
                    },
                },
                appointment: {
                    connect: {
                        appointmentId: data.appointmentId,
                    },
                },
                paymentMethod: {
                    connect: {
                        paymentMethodId: data.paymentMethodId,
                    },
                },
                VoucherType: {
                    connect: {
                        VoucherTypeId: data.VoucherTypeId,
                    },
                },
            },
        });
    });
}
exports.createPayment = createPayment;
function getLastPayment() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.payment.findFirst({
            orderBy: {
                paymentId: "desc",
            },
        });
    });
}
exports.getLastPayment = getLastPayment;
