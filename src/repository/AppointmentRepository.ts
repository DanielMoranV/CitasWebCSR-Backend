import { Appointment } from "@prisma/client";
import prisma from "../connection/prisma";

export async function createAppointment(
  data: Appointment
): Promise<Appointment> {
  const newAppointment = await prisma.instance.appointment.create({
    data: data,
    include: {
      appointmentServices: true,
    },
  });
  return newAppointment;
}
export async function getAppointmentId(
  appointmentId: number
): Promise<Appointment> {
  return await prisma.instance.appointment.findUniqueOrThrow({
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
}
