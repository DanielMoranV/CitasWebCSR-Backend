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
exports.updateCashRegister = exports.getCashRegisterForAdmissionist = exports.getByDateCashRegister = exports.getTodayCashRegisterForAdmissionist = exports.sumIngressAmountByCashRegisterId = exports.getPreviousCashRegisterForAdmissionist = exports.getCashRegisterId = exports.getCashRegisters = exports.createCashRegisterTransaction = exports.createCashRegister = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
function createCashRegister(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.cashRegister.create({
            data,
        });
    });
}
exports.createCashRegister = createCashRegister;
function createCashRegisterTransaction(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.cashRegisterTransaction.create({
            data,
        });
    });
}
exports.createCashRegisterTransaction = createCashRegisterTransaction;
function getCashRegisters() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.cashRegister.findMany({
            orderBy: {
                createAt: "asc",
            },
            include: {
                Admissionist: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    });
}
exports.getCashRegisters = getCashRegisters;
function getCashRegisterId(cashRegisterId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.cashRegister.findUnique({
            where: { cashRegisterId },
            include: {
                Admissionist: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    });
}
exports.getCashRegisterId = getCashRegisterId;
function getPreviousCashRegisterForAdmissionist(admissionistId) {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Establecer a medianoche para obtener el inicio del día
        return yield prisma_1.default.instance.cashRegister.findFirst({
            where: {
                admissionistId,
                createAt: {
                    lt: today, // Cambiado a 'lt' para buscar cajas anteriores a hoy
                },
            },
            orderBy: {
                createAt: "desc", // Ordenar por fecha de creación en orden descendente
            },
            include: {
                Admissionist: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    });
}
exports.getPreviousCashRegisterForAdmissionist = getPreviousCashRegisterForAdmissionist;
function sumIngressAmountByCashRegisterId(cashRegisterId) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma_1.default.instance.cashRegisterTransaction.aggregate({
            where: {
                cashRegisterId,
                transactionType: "Ingreso",
            },
            _sum: {
                amount: true,
            },
        });
        return ((_a = result._sum) === null || _a === void 0 ? void 0 : _a.amount) || 0; // Devolver la suma total o 0 si no hay registros
    });
}
exports.sumIngressAmountByCashRegisterId = sumIngressAmountByCashRegisterId;
function getTodayCashRegisterForAdmissionist(admissionistId) {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Establecer a medianoche para obtener el inicio del día
        return yield prisma_1.default.instance.cashRegister.findFirst({
            where: {
                admissionistId,
                createAt: {
                    gte: today,
                },
            },
            include: {
                Admissionist: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    });
}
exports.getTodayCashRegisterForAdmissionist = getTodayCashRegisterForAdmissionist;
function getByDateCashRegister(date) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.cashRegister.findMany({
            where: {
                createAt: {
                    gt: date,
                    lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
                },
            },
            orderBy: {
                createAt: "asc",
            },
            include: {
                Admissionist: {
                    include: {
                        user: true,
                    },
                },
                cashRegisterTransactions: true,
            },
        });
    });
}
exports.getByDateCashRegister = getByDateCashRegister;
function getCashRegisterForAdmissionist(admissionistId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.cashRegister.findFirst({
            where: {
                admissionistId,
            },
            orderBy: {
                createAt: "desc",
            },
            include: {
                Admissionist: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    });
}
exports.getCashRegisterForAdmissionist = getCashRegisterForAdmissionist;
function updateCashRegister(cashRegisterId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const cashRegister = yield prisma_1.default.instance.cashRegister.update({
            where: { cashRegisterId },
            data,
        });
        return cashRegister;
    });
}
exports.updateCashRegister = updateCashRegister;
