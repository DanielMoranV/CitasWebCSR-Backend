// import { User, Doctor } from "@prisma/client";
// import prisma from "../connection/prisma";

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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getInfoDoctors(): Promise<any> {
  return await await prisma.$queryRaw`
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
}
export async function getInfoDoctor(cmp: string): Promise<any> {
  return await await prisma.$queryRaw`
    SELECT CONCAT("user".name, ' ', surnames) as medico, cmp, specialization,medical_service.name,personalized_price.personalized_price AS price, doctor_id,medical_service_id FROM public.user
    join  public.doctor USING(user_id)
    join  public.personalized_price USING(doctor_id)
    join  public.medical_service USING(medical_service_id)
    where doctor.cmp = ${cmp} and medical_service.code = '50.00.00'
  `;
}
