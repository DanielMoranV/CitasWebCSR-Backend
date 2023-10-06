import { Appointment } from "@prisma/client";
import prisma from "../connection/prisma";

export async function createAppointment(
  data: Appointment
): Promise<Appointment> {
  const newAppointment = await prisma.instance.appointment.create({ data });
  return newAppointment;
}
