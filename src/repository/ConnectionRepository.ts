import { Connection } from "@prisma/client";
import prisma from "../connection/prisma";
import { client } from "../app";
export async function updateAvailableConnection(
  connectionId: number,
  data: any
): Promise<Connection> {
  return await prisma.instance.connection.update({
    where: { connectionId },
    data,
  });
}
export async function isConnectionAvailable(
  connectionId: number
): Promise<boolean> {
  try {
    // Consulta el estado de la conexión en la base de datos
    const connection = await prisma.instance.connection.findUnique({
      where: { connectionId },
    });

    // Devuelve true si la conexión está disponible, de lo contrario, false
    return connection?.available || false;
  } catch (error) {
    console.error("Error al consultar el estado de la conexión:", error);
    return false; // En caso de error, asume que la conexión no está disponible
  }
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
