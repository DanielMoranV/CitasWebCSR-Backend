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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTimeSlot = exports.createDoctorSchedule = exports.getDoctorSchedule = exports.getInfoDoctor = exports.getInfoDoctors = exports.updatePersonalizedPrice = exports.updateDoctor = exports.getDoctors = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
const client_1 = require("@prisma/client");
const newprisma = new client_1.PrismaClient();
function getDoctors() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.access.findMany({
            where: {
                roleId: 3,
                active: true,
            },
            orderBy: {
                userId: "asc",
            },
            include: {
                user: {
                    include: {
                        Doctor: { include: { personalizedPrices: true } },
                    },
                },
            },
        });
    });
}
exports.getDoctors = getDoctors;
function updateDoctor(doctorId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const doctor = yield prisma_1.default.instance.doctor.update({
            where: { doctorId },
            data,
        });
        return doctor;
    });
}
exports.updateDoctor = updateDoctor;
function updatePersonalizedPrice(personalizedPriceId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const personalizedPrice = yield prisma_1.default.instance.personalizedPrice.update({
            where: { personalizedPriceId },
            data,
        });
        return personalizedPrice;
    });
}
exports.updatePersonalizedPrice = updatePersonalizedPrice;
function getInfoDoctors() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield newprisma.$queryRaw `
    SELECT
      CONCAT("user".name, ' ', surnames) as medico,
      photo,
      cmp,
      specialization,
      medical_service.name AS service,
      personalized_price.personalized_price AS price
    FROM public.user
    JOIN public.access USING(user_id)
    JOIN public.doctor USING(user_id)
    JOIN public.personalized_price USING(doctor_id)
    JOIN public.medical_service USING(medical_service_id)
    WHERE medical_service.code = '50.00.00' AND access.active = true
  `;
    });
}
exports.getInfoDoctors = getInfoDoctors;
function getInfoDoctor(cmp) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield newprisma.$queryRaw `
    SELECT CONCAT("user".name, ' ', surnames) as medico, cmp, specialization,medical_service.name,personalized_price.personalized_price AS price, doctor_id,medical_service_id 
    FROM public.user
    JOIN public.access USING(user_id)
    join  public.doctor USING(user_id)
    join  public.personalized_price USING(doctor_id)
    join  public.medical_service USING(medical_service_id)
    where doctor.cmp = ${cmp} and medical_service.code = '50.00.00' AND access.active = true
  `;
    });
}
exports.getInfoDoctor = getInfoDoctor;
function getDoctorSchedule(doctorId) {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Establecer a medianoche para obtener el inicio del día
        return yield prisma_1.default.instance.schedule.findMany({
            where: {
                doctorId,
                availableSchedule: true,
                day: {
                    gte: today, // Obtener registros a partir de hoy
                },
            },
            include: {
                timeSlot: {
                    where: { availableTurn: true },
                },
            },
        });
    });
}
exports.getDoctorSchedule = getDoctorSchedule;
function createDoctorSchedule(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { doctorId } = data, rest = __rest(data, ["doctorId"]);
        // Crear un array de TimeSlots basado en la capacidad
        const timeSlots = [];
        let currentTime = new Date(rest.startTime);
        const end = new Date(rest.endTime);
        while (currentTime <= end && timeSlots.length < rest.capacity) {
            timeSlots.push({
                orderlyTurn: currentTime,
                nTurn: timeSlots.length + 1,
                availableTurn: true,
            });
            // Añadir el intervalo al tiempo actual
            currentTime = new Date(currentTime.getTime() + rest.interval * 60000);
        }
        return yield prisma_1.default.instance.schedule.create({
            data: Object.assign(Object.assign({}, rest), { doctor: {
                    connect: {
                        doctorId: doctorId,
                    },
                }, timeSlot: {
                    create: timeSlots,
                } }),
            include: {
                timeSlot: true, // Incluir los TimeSlots en la respuesta
            },
        });
    });
}
exports.createDoctorSchedule = createDoctorSchedule;
function updateTimeSlot(timeSlotId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.timeSlot.update({
            where: { timeSlotId },
            data,
        });
    });
}
exports.updateTimeSlot = updateTimeSlot;
