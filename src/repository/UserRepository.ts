import { User, Dependent } from "@prisma/client";
import prisma from "../connection/prisma";

export async function getUsers(): Promise<User[]> {
  return await prisma.instance.user.findMany({
    orderBy: {
      userId: "asc",
    },
    include: {
      access: true,
    },
  });
}

export async function userBydni(dni: string): Promise<User | null> {
  return await prisma.instance.user.findFirst({
    where: { dni },
    include: {
      access: true,
    },
  });
}
export async function userBydniDependent(dni: string): Promise<User | null> {
  return await prisma.instance.user.findFirst({
    where: { dni },
    include: {
      dependents: true,
    },
  });
}
export async function updateUserDependent(
  dependentId: number,
  data: Dependent
): Promise<any> {
  const dependent = await prisma.instance.dependent.update({
    where: { dependentId },
    data,
  });
  return dependent;
}
export async function createUser(data: User): Promise<User> {
  const newUser = await prisma.instance.user.create({ data });
  return newUser;
}
export async function createDependent(data: Dependent): Promise<Dependent> {
  const newDependent = await prisma.instance.dependent.create({ data });
  return newDependent;
}

export async function updateUser(dni: string, data: User): Promise<any> {
  const user = await prisma.instance.user.update({
    where: { dni },
    data,
  });
  return user;
}

export async function deleteUser(dni: string): Promise<any> {
  const deletedUser = await prisma.instance.user.delete({
    where: {
      dni,
    },
    include: {
      access: true,
    },
  });
  return deletedUser;
}
