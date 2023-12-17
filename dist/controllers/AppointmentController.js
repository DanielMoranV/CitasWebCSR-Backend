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
const AppointmentRepository_1 = require("../repository/AppointmentRepository");
const DoctorsRepository_1 = require("../repository/DoctorsRepository");
class AppointmentHandler {
    createAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const { timeSlotId } = req.body;
                yield (0, DoctorsRepository_1.updateTimeSlot)(Number(timeSlotId), { availableTurn: false });
                const newAppointment = yield (0, AppointmentRepository_1.createAppointment)(data);
                const message = "Operación exitosa Registro Creado";
                (0, response_1.success)({ res, data: newAppointment, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    createAppointmentHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                yield (0, AppointmentRepository_1.updateAppointment)(Number(data.appointmentId), {
                    status: "atendido",
                });
                const newAppointment = yield (0, AppointmentRepository_1.createAppointmentHistory)(data);
                const message = "Operación exitosa Registro Creado";
                (0, response_1.success)({ res, data: newAppointment, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    getAppointmentId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointmentId = Number(req.params.appointmentId);
                const appointment = yield (0, AppointmentRepository_1.getAppointmentId)(appointmentId);
                const message = "Operación exitosa Lista de empleados";
                (0, response_1.success)({ res, data: appointment, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    updateAppointmentHistoryId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointmentHistoryId = Number(req.params.appointmentHistoryId);
                const data = req.body;
                const appointmentHistory = yield (0, AppointmentRepository_1.updateAppointmentHistory)(appointmentHistoryId, data);
                const message = "Operación exitosa Registro Actualizado";
                (0, response_1.success)({ res, data: appointmentHistory, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    updateAppointmentId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointmentId = Number(req.params.appointmentId);
                const data = req.body;
                const appointment = yield (0, AppointmentRepository_1.updateAppointment)(appointmentId, data);
                const message = "Operación exitosa Registro Actualizado";
                (0, response_1.success)({ res, data: appointment, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    deleteAppointmentId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointmentId = Number(req.params.appointmentId);
                const { timeSlotId } = yield (0, AppointmentRepository_1.getAppointmentId)(appointmentId);
                yield (0, DoctorsRepository_1.updateTimeSlot)(Number(timeSlotId), { availableTurn: true });
                const appointment = yield (0, AppointmentRepository_1.deleteAppointment)(appointmentId);
                const message = "Operación exitosa Registro Eliminado";
                // trabajar cuando no encuentra dni
                (0, response_1.success)({ res, data: appointment, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    getAppointmentsHistoryUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = Number(req.params.userId);
                const user = yield (0, AppointmentRepository_1.getAppointmentsHistoryUser)(userId);
                const message = "Operación exitosa Lista de empleados";
                (0, response_1.success)({ res, data: user, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    getAppointmentUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = Number(req.params.userId);
                const user = yield (0, AppointmentRepository_1.getAppointmentsUserId)(userId);
                const message = "Operación exitosa Lista de empleados";
                (0, response_1.success)({ res, data: user, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    getAppointmentDoctorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctorId = Number(req.params.doctorId);
                const user = yield (0, AppointmentRepository_1.getAppointmentDoctorId)(doctorId);
                const message = "Operación exitosa Lista de turnos";
                (0, response_1.success)({ res, data: user, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    getAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield (0, AppointmentRepository_1.getAppointment)();
                const message = "Operación exitosa Lista de empleados";
                (0, response_1.success)({ res, data: user, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
}
exports.default = AppointmentHandler;
