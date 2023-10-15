import { Payment } from "@prisma/client";
import prisma from "../connection/prisma";

export async function createPayment(data: Payment): Promise<Payment> {
  return await prisma.instance.payment.create({ data });
}
