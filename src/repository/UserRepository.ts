import { User, Dependent, Access } from "@prisma/client";
import prisma from "../connection/prisma";
import puppeteer from "puppeteer";

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
export async function getPatients(): Promise<any> {
  return await prisma.instance.access.findMany({
    where: {
      roleId: 4,
      active: true,
    },
    orderBy: {
      userId: "asc",
    },
    select: {
      user: {
        include: {
          dependents: true,
        },
      },
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
export async function deleteUserDependent(
  dependentId: number
): Promise<Dependent> {
  const deletedUser = await prisma.instance.dependent.delete({
    where: {
      dependentId,
    },
  });
  return deletedUser;
}
export async function createUser(data: any): Promise<User> {
  if (data.Doctor) {
    const newUser = await prisma.instance.user.create({
      data: {
        address: data.address,
        birthDate: data.birthDate,
        civilStatus: data.civilStatus,
        dni: data.dni,
        documentType: data.documentType,
        email: data.email,
        name: data.name,
        phone: data.phone,
        photo: data.photo,
        sex: data.sex,
        surnames: data.surnames,
        access: {
          create: {
            username: data.access.username,
            password: data.access.password,
            roleId: data.access.roleId,
            createAt: new Date(),
            status: "offline",
          },
        },
        Doctor: {
          create: {
            specialization: data.Doctor.specialization,
            status: data.Doctor.status,
            cmp: data.Doctor.cmp,
            rne: data.Doctor.rne,
            personalizedPrices: {
              create: [
                {
                  personalizedPrice:
                    data.Doctor.personalizedPrices[0].personalizedPrice,
                  medicalServiceId:
                    data.Doctor.personalizedPrices[0].medicalServiceId,
                },
              ],
            },
          },
        },
      },
      include: {
        access: true,
        Doctor: {
          include: {
            personalizedPrices: true,
          },
        },
      },
    });
    return newUser;
  } else {
    const newUser = await prisma.instance.user.create({
      data: {
        address: data.address,
        birthDate: data.birthDate,
        civilStatus: data.civilStatus,
        dni: data.dni,
        documentType: data.documentType,
        email: data.email,
        name: data.name,
        phone: data.phone,
        photo: data.photo,
        sex: data.sex,
        surnames: data.surnames,
        access: {
          create: {
            username: data.access.username,
            password: data.access.password,
            roleId: data.access.roleId,
            createAt: new Date(),
            status: "offline",
          },
        },
      },
      include: {
        access: true,
      },
    });
    return newUser;
  }
}
export async function createDependent(data: Dependent): Promise<Dependent> {
  const newDependent = await prisma.instance.dependent.create({ data });
  return newDependent;
}

export async function updateUser(dni: string, data: any): Promise<any> {
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

export async function searchbydni(dni: string): Promise<any> {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Navegar a la páginas
  await page.goto("https://eldni.com/pe/buscar-datos-por-dni");

  // Completar el formulario con el número de DNI
  await page.type("#dni", dni);

  // Enviar el formulario
  await page.click("#btn-buscar-datos-por-dni");

  // Esperar a que la página cargue los resultados
  await page.waitForSelector("#column-center");

  // Extraer los resultados
  const user = await page.evaluate(() => {
    const nombresElement = document.querySelector(
      "#column-center table tbody tr td:nth-child(2)"
    );
    const nombres = nombresElement ? nombresElement.textContent?.trim() : "";
    const dniElement = document.querySelector(
      "#column-center table tbody tr td:nth-child(1)"
    );
    const dni = dniElement ? dniElement.textContent?.trim() : "";
    const apellidopElement = document.querySelector(
      "#column-center table tbody tr td:nth-child(3)"
    );
    const apellidop = apellidopElement
      ? apellidopElement.textContent?.trim()
      : "";
    const apellidomElement = document.querySelector(
      "#column-center table tbody tr td:nth-child(4)"
    );
    const apellidom = apellidomElement
      ? apellidomElement.textContent?.trim()
      : "";
    const digitoVerificadorElement = document.querySelector(
      "#column-center table:nth-child(3) tbody tr td mark"
    );
    const digitoVerificador = digitoVerificadorElement
      ? digitoVerificadorElement.textContent?.trim()
      : "";

    return { nombres, dni, digitoVerificador, apellidop, apellidom };
  });

  console.log("Resultados:", user);
  await browser.close();
  return user;
}
