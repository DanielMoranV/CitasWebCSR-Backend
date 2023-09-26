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
exports.getInfoDoctor = exports.getInfoDoctors = exports.updatePersonalizedPrice = exports.updateDoctor = exports.getDoctors = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
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
const client_1 = require("@prisma/client");
const newprisma = new client_1.PrismaClient();
function getInfoDoctors() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield newprisma.$queryRaw `
    SELECT
      CONCAT("user".name, ' ', surnames) as medico,
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
