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
exports.getLastPayment = exports.createPayment = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
function createPayment(data) {
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
