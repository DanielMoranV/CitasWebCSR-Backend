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
const DoctorsRepository_1 = require("../repository/DoctorsRepository");
const response_1 = require("../utils/response");
class DoctorsHandler {
    getDoctors(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctors = yield (0, DoctorsRepository_1.getDoctors)();
                if (doctors.length != 0) {
                    const message = "Operación exitosa Información de Médicos";
                    (0, response_1.success)({ res, data: doctors, message });
                }
                else {
                    const message = "Operación exitosa sin registros";
                    (0, response_1.success)({ res, data: doctors, message });
                }
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    updateDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctorId = Number(req.params.doctorId);
                const data = req.body;
                const doctor = yield (0, DoctorsRepository_1.updateDoctor)(doctorId, data);
                const message = "Operación exitosa Registro Actualizado";
                (0, response_1.success)({ res, data: doctor, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    updatePersonalizedPrice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personalizedPriceId = Number(req.params.personalizedPriceId);
                const data = req.body;
                const personalizedPrice = yield (0, DoctorsRepository_1.updatePersonalizedPrice)(personalizedPriceId, data);
                const message = "Operación exitosa Registro Actualizado";
                (0, response_1.success)({ res, data: personalizedPrice, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    updateSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const scheduleId = Number(req.params.scheduleId);
                const data = req.body;
                const schedule = yield (0, DoctorsRepository_1.updateSchedule)(scheduleId, data);
                const message = "Operación exitosa Registro Actualizado";
                (0, response_1.success)({ res, data: schedule, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
                console.log(error);
            }
        });
    }
    getDoctorSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctorId = Number(req.params.doctorId);
                const doctor = yield (0, DoctorsRepository_1.getDoctorSchedule)(doctorId);
                if (doctor) {
                    const message = "Operación exitosa Registro Encontrado";
                    (0, response_1.success)({ res, data: doctor, message });
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
    createDoctorSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const doctor = yield (0, DoctorsRepository_1.createDoctorSchedule)(data);
                if (doctor) {
                    const message = "Operación exitosa Registro Encontrado";
                    (0, response_1.success)({ res, data: doctor, message });
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
}
exports.default = DoctorsHandler;
