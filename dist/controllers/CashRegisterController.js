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
const CashRegisterRepository_1 = require("../repository/CashRegisterRepository");
const response_1 = require("../utils/response");
class CashRegisterHandler {
    createCashRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                data.createAt = new Date();
                const newCollaborator = yield (0, CashRegisterRepository_1.createCashRegister)(data);
                const message = "Operación exitosa Registro Creado";
                (0, response_1.success)({ res, data: newCollaborator, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    createCashRegisterTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const newCollaborator = yield (0, CashRegisterRepository_1.createCashRegisterTransaction)(data);
                const message = "Operación exitosa Registro Creado";
                (0, response_1.success)({ res, data: newCollaborator, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    getCashRegisters(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cashRegisters = yield (0, CashRegisterRepository_1.getCashRegisters)();
                if (cashRegisters.length != 0) {
                    const message = "Operación exitosa Lista de empleados";
                    (0, response_1.success)({ res, data: cashRegisters, message });
                }
                else {
                    const message = "Operación exitosa sin registros";
                    (0, response_1.success)({ res, data: cashRegisters, message });
                }
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    getcashRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cashRegisterId = Number(req.params.cashRegisterId);
                const cashRegister = yield (0, CashRegisterRepository_1.getCashRegisterId)(cashRegisterId);
                if (cashRegister) {
                    const message = "Operación exitosa Registro Encontrado";
                    (0, response_1.success)({ res, data: cashRegister, message });
                }
                else {
                    const message = "Operación exitosa No se encontraron resultados";
                    (0, response_1.success)({ res, data: null, message });
                }
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    sumIngressAmountByCashRegisterId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cashRegisterId = Number(req.params.cashRegisterId);
                console.log(cashRegisterId);
                const cashRegister = yield (0, CashRegisterRepository_1.sumIngressAmountByCashRegisterId)(cashRegisterId);
                if (cashRegister) {
                    const message = "Operación exitosa Registro Encontrado";
                    (0, response_1.success)({ res, data: cashRegister, message });
                }
                else {
                    const message = "Operación exitosa No se encontraron resultados";
                    (0, response_1.success)({ res, data: null, message });
                }
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    sumEgressAmountByCashRegisterId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cashRegisterId = Number(req.params.cashRegisterId);
                console.log(cashRegisterId);
                const cashRegister = yield (0, CashRegisterRepository_1.sumEgressAmountByCashRegisterId)(cashRegisterId);
                if (cashRegister) {
                    const message = "Operación exitosa Registro Encontrado";
                    (0, response_1.success)({ res, data: cashRegister, message });
                }
                else {
                    const message = "Operación exitosa No se encontraron resultados";
                    (0, response_1.success)({ res, data: null, message });
                }
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    getTodayCashRegisterForAdmissionist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admissionistId = Number(req.params.admissionistId);
                const cashRegister = yield (0, CashRegisterRepository_1.getTodayCashRegisterForAdmissionist)(admissionistId);
                if (cashRegister) {
                    const message = "Operación exitosa Registro Encontrado";
                    (0, response_1.success)({ res, data: cashRegister, message });
                }
                else {
                    const message = "Operación exitosa No se encontraron resultados";
                    (0, response_1.success)({ res, data: null, message });
                }
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    getByDateCashRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = new Date(req.params.date);
                console.log(date);
                const cashRegister = yield (0, CashRegisterRepository_1.getByDateCashRegister)(date);
                if (cashRegister) {
                    const message = "Operación exitosa Registro Encontrado";
                    (0, response_1.success)({ res, data: cashRegister, message });
                }
                else {
                    const message = "Operación exitosa No se encontraron resultados";
                    (0, response_1.success)({ res, data: null, message });
                }
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    getPreviousCashRegisterForAdmissionist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admissionistId = Number(req.params.admissionistId);
                const cashRegister = yield (0, CashRegisterRepository_1.getPreviousCashRegisterForAdmissionist)(admissionistId);
                if (cashRegister) {
                    const message = "Operación exitosa Registro Encontrado";
                    (0, response_1.success)({ res, data: cashRegister, message });
                }
                else {
                    const message = "Operación exitosa No se encontraron resultados";
                    (0, response_1.success)({ res, data: null, message });
                }
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    getCashRegisterForAdmissionist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admissionistId = Number(req.params.admissionistId);
                const cashRegister = yield (0, CashRegisterRepository_1.getCashRegisterForAdmissionist)(admissionistId);
                if (cashRegister) {
                    const message = "Operación exitosa Registro Encontrado";
                    (0, response_1.success)({ res, data: cashRegister, message });
                }
                else {
                    const message = "Operación exitosa No se encontraron resultados";
                    (0, response_1.success)({ res, data: null, message });
                }
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    updateCashRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cashRegisterId = Number(req.params.cashRegisterId);
                const data = req.body;
                const cashRegister = yield (0, CashRegisterRepository_1.updateCashRegister)(cashRegisterId, data);
                const message = "Operación exitosa Registro Actualizado";
                (0, response_1.success)({ res, data: cashRegister, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
}
exports.default = CashRegisterHandler;
