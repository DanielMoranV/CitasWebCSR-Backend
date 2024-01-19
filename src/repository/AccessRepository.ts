import { User, Access } from "@prisma/client";
import prisma from "../connection/prisma";

export async function accessBydni(username: string): Promise<Access | null> {
  return await prisma.instance.access.findFirst({
    where: { username },
    include: {
      user: {
        include: {
          Doctor: true,
        },
      },
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

export async function createAccessUser(data: Access): Promise<Access> {
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

export async function updateAccess(
  username: string,
  data: Access
): Promise<any> {
  return await prisma.instance.access.updateMany({
    where: { username },
    data,
  });
}
export async function updateAccessId(
  accessId: number,
  data: Access
): Promise<any> {
  return await prisma.instance.access.update({
    where: { accessId },
    data,
  });
}
