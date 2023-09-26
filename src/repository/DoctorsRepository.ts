import { User, Doctor, Access, PersonalizedPrice } from "@prisma/client";
import prisma from "../connection/prisma";

export async function getDoctors(): Promise<Access[]> {
  return await prisma.instance.access.findMany({
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
}
export async function updateDoctor(
  doctorId: number,
  data: Doctor
): Promise<any> {
  const doctor = await prisma.instance.doctor.update({
    where: { doctorId },
    data,
  });
  return doctor;
}
export async function updatePersonalizedPrice(
  personalizedPriceId: number,
  data: PersonalizedPrice
): Promise<any> {
  const personalizedPrice = await prisma.instance.personalizedPrice.update({
    where: { personalizedPriceId },
    data,
  });
  return personalizedPrice;
}
import { PrismaClient } from "@prisma/client";
const newprisma = new PrismaClient();

export async function getInfoDoctors(): Promise<any> {
  return await newprisma.$queryRaw`
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
}
export async function getInfoDoctor(cmp: string): Promise<any> {
  return await newprisma.$queryRaw`
    SELECT CONCAT("user".name, ' ', surnames) as medico, cmp, specialization,medical_service.name,personalized_price.personalized_price AS price, doctor_id,medical_service_id 
    FROM public.user
    JOIN public.access USING(user_id)
    join  public.doctor USING(user_id)
    join  public.personalized_price USING(doctor_id)
    join  public.medical_service USING(medical_service_id)
    where doctor.cmp = ${cmp} and medical_service.code = '50.00.00' AND access.active = true
  `;
}
