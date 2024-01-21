// twilioService.ts

import Twilio from "twilio";
import * as dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.accountSidTwilio || "";
const authToken = process.env.authTokenTwilio || "";
const twilioPhoneNumber = process.env.twilioPhoneNumber || "";

const client = new Twilio.Twilio(accountSid, authToken);

export async function sendSMS(to: string, body: string): Promise<boolean> {
  try {
    const message = await client.messages.create({
      body: body,
      from: twilioPhoneNumber,
      to: to,
    });

    console.log("Mensaje enviado:", message.sid);
    return true;
  } catch (error: any) {
    console.error("Error al enviar el mensaje:", error.message);
    return false;
  }
}
