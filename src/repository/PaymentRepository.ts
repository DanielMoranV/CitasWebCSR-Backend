import { Payment } from "@prisma/client";
import prisma from "../connection/prisma";

export async function createPayment(data: any): Promise<Payment> {
  return await prisma.instance.payment.create({
    data: {
      amount: data.amount,
      paymentDate: data.paymentDate,
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
