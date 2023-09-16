import { User, Access } from "@prisma/client";
import prisma from "../connection/prisma";

export async function getCollaborators(): Promise<Access[]> {
  return await prisma.instance.access.findMany({
    where: {
      roleId: {
        in: [1, 2, 3],
      },
    },
    orderBy: {
      userId: "asc",
    },
    include: {
      user: true,
    },
  });
}

export async function collaboratorBydni(dni: string): Promise<User | null> {
  return await prisma.instance.user.findFirst({
    where: {
      dni,
      access: {
        some: {
          roleId: {
            in: [1, 2, 3],
          },
        },
      },
    },
    include: {
      access: true,
    },
  });
}

export async function createCollaborator(data: User): Promise<User> {
  const newUser = await prisma.instance.user.create({ data });
  return newUser;
}

export async function updateCollaborator(
  dni: string,
  data: User
): Promise<any> {
  const user = await prisma.instance.user.update({
    where: { dni },
    data,
  });
  return user;
}

export async function deleteCollaborator(dni: string): Promise<any> {
  const deletedUser = await prisma.instance.user.delete({
    where: {
      dni,
      access: {
        some: {
          roleId: {
            in: [1, 2, 3],
          },
        },
      },
    },
    include: {
      access: true,
    },
  });
  return deletedUser;
}
