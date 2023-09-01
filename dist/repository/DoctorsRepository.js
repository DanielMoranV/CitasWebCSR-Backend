"use strict";
// import { User, Doctor } from "@prisma/client";
// import prisma from "../connection/prisma";
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
exports.getInfoDoctors = void 0;
// export async function getInfoDoctors(): Promise<User[]> {
//   return await prisma.instance.user.findMany({
//     orderBy: {
//       userId: "asc",
//     },
//     include: {
//       doctors: true,
//     },
//   });
// }
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getInfoDoctors() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield yield prisma.$queryRaw `
    SELECT
      CONCAT("user".name, ' ', surnames) as medico,
      cmp,
      specialization,
      medical_service.name AS service,
      personalized_price.personalized_price AS price
    FROM public.user
    JOIN public.doctor USING(user_id)
    JOIN public.personalized_price USING(doctor_id)
    JOIN public.medical_service USING(medical_service_id)
    WHERE medical_service.code = '50.00.00'
  `;
    });
}
exports.getInfoDoctors = getInfoDoctors;
