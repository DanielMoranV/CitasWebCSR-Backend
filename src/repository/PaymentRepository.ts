import { Payment } from "@prisma/client";
import prisma from "../connection/prisma";

export async function createPaymentCash(data: any): Promise<Payment> {
  console.log(data);
  return await prisma.instance.payment.create({
    data: {
      amount: data.amount,
      paymentDate: data.paymentDate,
      voucherNumber: data.voucherNumber,
      chargeId: data.chargeId,
      Admissionist: {
        connect: {
          accessId: data.admissionistId,
        },
      },
      User: {
        connect: {
          userId: data.userId,
        },
      },
      appointment: {
        connect: {
          appointmentId: data.appointmentId,
        },
      },
      paymentMethod: {
        connect: {
          paymentMethodId: data.paymentMethodId,
        },
      },
      VoucherType: {
        connect: {
          VoucherTypeId: data.VoucherTypeId,
        },
      },
    },
  });
}
export async function createPayment(data: any): Promise<Payment> {
  console.log(data);
  return await prisma.instance.payment.create({
    data: {
      amount: data.amount,
      paymentDate: data.paymentDate,
      voucherNumber: data.voucherNumber,
      chargeId: data.chargeId,
      User: {
        connect: {
          userId: data.userId,
        },
      },
      appointment: {
        connect: {
          appointmentId: data.appointmentId,
        },
      },
      paymentMethod: {
        connect: {
          paymentMethodId: data.paymentMethodId,
        },
      },
      VoucherType: {
        connect: {
          VoucherTypeId: data.VoucherTypeId,
        },
      },
    },
  });
}
export async function getLastPayment(): Promise<Payment | null> {
  return await prisma.instance.payment.findFirst({
    orderBy: {
      paymentId: "desc",
    },
  });
}
