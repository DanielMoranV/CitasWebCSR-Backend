import { Payment } from "@prisma/client";
import prisma from "../connection/prisma";
import axios from "axios";

const CULQI_ACCESS_TOKEN = process.env.ACCESS_TOKEN_CULQUI;

export async function createCharge(data: any): Promise<boolean> {
  try {
    const options = {
      method: "POST",
      url: "https://api.culqi.com/v2/charges",
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${CULQI_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      data: {
        amount: data.metadata.amount,
        currency_code: "PEN",
        email: data.email,
        source_id: data.id,
        antifraud_details: {
          address: data.client.address,
          address_city: "Piura",
          country_code: "PE",
          first_name: data.client.name,
          last_name: data.client.surnames,
          phone: data.client.phone,
        },
      },
    };

    const culqiResponse = await axios(options);

    // Verificar si el cargo se creó correctamente
    if (culqiResponse.status === 201) {
      return true;
    } else {
      throw new Error("Error en la creación del cargo.");
    }
  } catch (error) {
    throw error; // Relanzar la excepción para que pueda ser manejada en createPayment
  }
}
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
