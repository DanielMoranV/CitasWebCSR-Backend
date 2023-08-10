import { User, Access } from "@prisma/client";
import prisma from "../connection/prisma";

export async function accessBydni(username: string): Promise<Access | null> {
  return await prisma.instance.access.findFirst({
    where: { username },
    include: {
      user: true,
      role: true,
    },
  });
}

export async function getAccess(): Promise<Access[]> {
  return await prisma.instance.access.findMany({
    orderBy: {
      userId: "asc",
    },
  });
}

export async function createAccessUser(data: any): Promise<any> {
  const newAccessUser = await prisma.instance.access.create({ data });
  return newAccessUser;
}

export async function updateLastSession(username: string): Promise<any> {
  return await prisma.instance.access.updateMany({
    where: { username },
    data: {
      lastSession: new Date(),
      status: "online",
    },
  });
}

export async function logout(username: string) {
  return await prisma.instance.access.updateMany({
    where: { username },
    data: {
      status: "offline",
    },
  });
}

export async function updateTemporalCode(
  dni: string,
  temporalCode: string | null
): Promise<any> {
  return await prisma.instance.access.updateMany({
    where: { username: dni },
    data: {
      temporalCode,
    },
  });
}
export async function updateAccess(
  username: string,
  data: Access
): Promise<any> {
  return await prisma.instance.access.updateMany({
    where: { username },
    data,
  });
}
