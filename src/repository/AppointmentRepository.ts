import { Appointment, AppointmentHistory, TimeSlot } from "@prisma/client";
import prisma from "../connection/prisma";

export async function createAppointmentHistory(
  data: AppointmentHistory
): Promise<AppointmentHistory> {
  const newAppointmentHistory = await prisma.instance.appointmentHistory.create(
    { data }
  );
  return newAppointmentHistory;
}
export async function updateAppointmentHistory(
  appointmentHistoryId: number,
  data: Appointment | any
): Promise<AppointmentHistory> {
  const appointmentHistory = await prisma.instance.appointmentHistory.update({
    where: { appointmentHistoryId },
    data,
  });
  return appointmentHistory;
}
export async function getAppointmentsHistoryUserIdDoctorId(
  userId: number,
  doctorId: number
): Promise<AppointmentHistory[]> {
  return await prisma.instance.appointmentHistory.findMany({
    where: { userId, doctorId }, // Filtra por el ID de usuario
    include: {
      user: true,
      doctor: true,
      appointment: {
        include: {
          timeSlot: true,
        },
      },
    },
    orderBy: {
      appointmentHistoryId: "desc",
    },
  });
}
export async function getAppointmentsHistoryUser(
  userId: number
): Promise<AppointmentHistory[]> {
  return await prisma.instance.appointmentHistory.findMany({
    where: { userId }, // Filtra por el ID de usuario
    include: {
      user: true,
      doctor: {
        include: {
          user: true,
        },
      },
      appointment: {
        include: {
          timeSlot: true,
        },
      },
    },
    orderBy: {
      appointmentHistoryId: "desc",
    },
  });
}
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
export async function deleteAppointment(
  appointmentId: number
): Promise<Appointment> {
  const deleteAppointment = await prisma.instance.appointment.delete({
    where: {
      appointmentId,
    },
  });
  return deleteAppointment;
}
export async function updateAppointment(
  appointmentId: number,
  data: Appointment | any
): Promise<Appointment> {
  const dependent = await prisma.instance.appointment.update({
    where: { appointmentId },
    data,
  });
  return dependent;
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
export async function getAppointmentsUserId(
  userId: number
): Promise<Appointment[]> {
  return await prisma.instance.appointment.findMany({
    where: { userId }, // Filtra por el ID de usuario
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
      appointmentHistories: true,
    },
    orderBy: {
      createAt: "desc",
    },
  });
}

export async function getAppointment(): Promise<TimeSlot[]> {
  const beforeYesterday = new Date();
  beforeYesterday.setDate(beforeYesterday.getDate() - 2);
  return await prisma.instance.timeSlot.findMany({
    where: {
      orderlyTurn: {
        gte: new Date(), // Filtrar registros a partir de anteayer
      },
    },
    include: {
      Appointment: {
        include: {
          user: true,
          dependent: {
            include: {
              user: true,
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
      },
      Schedule: {
        include: {
          doctor: {
            include: {
              user: true,
              personalizedPrices: true,
            },
          },
        },
      },
    },
    orderBy: {
      orderlyTurn: "asc",
    },
  });
}
export async function getAppointmentDoctorId(
  doctorId: number
): Promise<TimeSlot[]> {
  const today = new Date();
  return await prisma.instance.timeSlot.findMany({
    where: {
      orderlyTurn: {
        gte: new Date(today.toDateString()), // Filtra registros a partir de hoy
      },
      Schedule: {
        day: {
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Menos de 24 horas después del inicio del día
        },
        doctorId: doctorId,
        availableSchedule: true,
      },
    },
    include: {
      Appointment: {
        include: {
          user: true,
          dependent: {
            include: {
              user: true,
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
      },
      Schedule: {
        include: {
          doctor: {
            include: {
              user: true,
              personalizedPrices: true,
            },
          },
        },
      },
    },
    orderBy: {
      orderlyTurn: "asc",
    },
  });
}
export async function getAppointmentDoctorIdByDay(
  doctorId: number,
  day: Date
): Promise<TimeSlot[]> {
  return await prisma.instance.timeSlot.findMany({
    where: {
      orderlyTurn: {
        gte: day, // Filtra registros a partir de hoy
      },
      Schedule: {
        day: {
          lt: new Date(day.getTime() + 24 * 60 * 60 * 1000), // Menos de 24 horas después del inicio del día
        },
        doctorId: doctorId,
      },
    },
    include: {
      Appointment: {
        include: {
          user: true,
          payments: true,
          dependent: {
            include: {
              user: true,
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
      },
      Schedule: {
        include: {
          doctor: {
            include: {
              user: true,
              personalizedPrices: true,
            },
          },
        },
      },
    },
    orderBy: {
      orderlyTurn: "asc",
    },
  });
}
