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
exports.getAppointment = exports.getAppointmentsUserId = exports.getAppointmentId = exports.createAppointment = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
function createAppointment(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const newAppointment = yield prisma_1.default.instance.appointment.create({
            data: data,
            include: {
                appointmentServices: true,
            },
        });
        return newAppointment;
    });
}
exports.createAppointment = createAppointment;
function getAppointmentId(appointmentId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.appointment.findUniqueOrThrow({
            where: { appointmentId },
            include: {
                user: true,
                dependent: {
                    include: {
                        user: true,
                    },
                },
                doctor: {
                    include: {
                        user: true,
                        personalizedPrices: true,
                    },
                },
                timeSlot: true,
                appointmentServices: {
                    include: {
                        medicalService: true,
                    },
                },
            },
        });
    });
}
exports.getAppointmentId = getAppointmentId;
function getAppointmentsUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.appointment.findMany({
            where: { userId },
            include: {
                user: true,
                dependent: {
                    include: {
                        user: true,
                    },
                },
                doctor: {
                    include: {
                        user: true,
                        personalizedPrices: true,
                    },
                },
                timeSlot: true,
                appointmentServices: {
                    include: {
                        medicalService: true,
                    },
                },
            },
            orderBy: {
                createAt: "desc",
            },
        });
    });
}
exports.getAppointmentsUserId = getAppointmentsUserId;
function getAppointment() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.appointment.findMany({
            include: {
                user: true,
                dependent: {
                    include: {
                        user: true,
                    },
                },
                doctor: {
                    include: {
                        user: true,
                        personalizedPrices: true,
                    },
                },
                timeSlot: true,
                appointmentServices: {
                    include: {
                        medicalService: true,
                    },
                },
            },
            orderBy: {
                createAt: "desc",
            },
        });
    });
}
exports.getAppointment = getAppointment;
