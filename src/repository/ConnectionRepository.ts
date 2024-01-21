import { Connection } from "@prisma/client";
import prisma from "../connection/prisma";
import { client } from "../app";
export async function updateAvailableConnection(
  connectionId: number,
  data: any
): Promise<Connection> {
  console.log("holi actualizando");
  return await prisma.instance.connection.update({
    where: { connectionId },
    data,
  });
}
// export async function isConnectionAvailable(
//   connectionId: number
// ): Promise<any> {
//   console.log("holi consultando");
//   // Consulta el estado de la conexión en la base de datos
//   const connection = await prisma.instance.connection.findUnique({
//     where: { connectionId },
//     select: { available: true },
//   });
//   console.log("prisma", connection);
//   // Devuelve true si la conexión está disponible, de lo contrario, false
//   return connection?.available;
// }
export async function isConnectionAvailable(): Promise<any> {
  return client.session ? true : false;
}

export async function sendMessageWp(
  phone: string,
  message: string
): Promise<boolean> {
  try {
    const formattedNumber = `51${phone}`;
    // Enviar el mensaje
    const chat = await client.getChatById(formattedNumber + "@c.us");
    await chat.sendMessage(message);
    console.log("Mensaje enviado correctamente");
    return true;
  } catch (error) {
    console.error("Error al enviar el mensaje de WhatsApp:", error);
    return false;
  }
}
