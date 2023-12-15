import { CashRegister, CashRegisterTransaction } from "@prisma/client";
import prisma from "../connection/prisma";

export async function createCashRegister(
  data: CashRegister
): Promise<CashRegister> {
  return await prisma.instance.cashRegister.create({
    data,
  });
}
export async function createCashRegisterTransaction(
  data: CashRegisterTransaction
): Promise<CashRegisterTransaction> {
  return await prisma.instance.cashRegisterTransaction.create({
    data,
  });
}
export async function getCashRegisters(): Promise<CashRegister[]> {
  return await prisma.instance.cashRegister.findMany({
    orderBy: {
      createAt: "asc",
    },
    include: {
      Admissionist: {
        include: {
          user: true,
        },
      },
    },
  });
}
export async function getCashRegisterId(
  cashRegisterId: number
): Promise<CashRegister | null> {
  return await prisma.instance.cashRegister.findUnique({
    where: { cashRegisterId },
    include: {
      Admissionist: {
        include: {
          user: true,
        },
      },
    },
  });
}
export async function getPreviousCashRegisterForAdmissionist(
  admissionistId: number
): Promise<CashRegister | null> {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Establecer a medianoche para obtener el inicio del día

  return await prisma.instance.cashRegister.findFirst({
    where: {
      admissionistId,
      createAt: {
        lt: today, // Cambiado a 'lt' para buscar cajas anteriores a hoy
      },
    },
    orderBy: {
      createAt: "desc", // Ordenar por fecha de creación en orden descendente
    },
    include: {
      Admissionist: {
        include: {
          user: true,
        },
      },
    },
  });
}
export async function sumIngressAmountByCashRegisterId(
  cashRegisterId: number
): Promise<number> {
  const result = await prisma.instance.cashRegisterTransaction.aggregate({
    where: {
      cashRegisterId,
      transactionType: "Ingreso",
    },
    _sum: {
      amount: true,
    },
  });

  return result._sum?.amount || 0; // Devolver la suma total o 0 si no hay registros
}

export async function getTodayCashRegisterForAdmissionist(
  admissionistId: number
): Promise<CashRegister | null> {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Establecer a medianoche para obtener el inicio del día

  return await prisma.instance.cashRegister.findFirst({
    where: {
      admissionistId,
      createAt: {
        gte: today,
      },
    },
    include: {
      Admissionist: {
        include: {
          user: true,
        },
      },
    },
  });
}
export async function getCashRegisterForAdmissionist(
  admissionistId: number
): Promise<CashRegister | null> {
  return await prisma.instance.cashRegister.findFirst({
    where: {
      admissionistId,
    },
    orderBy: {
      createAt: "desc",
    },
    include: {
      Admissionist: {
        include: {
          user: true,
        },
      },
    },
  });
}
export async function updateCashRegister(
  cashRegisterId: number,
  data: CashRegister
): Promise<CashRegister> {
  const cashRegister = await prisma.instance.cashRegister.update({
    where: { cashRegisterId },
    data,
  });
  return cashRegister;
}
