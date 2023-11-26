import { Express, Router } from "express";

import user from "./user";
import verifyToken from "../midlewares/verifyToken";
import access from "./access";
import collaborators from "./collaborator";
import infoDoctors from "./infoDoctors";
import doctors from "./doctor";
import appointment from "./appointment";
import payment from "./payment";
import patients from "./patients";
import imgqrwp from "./imageQrWhatsapp";
import imgusers from "./imageUsers";

export async function useRouter(app: Express, api_url: string) {
  //version 1

  const router = Router();

  // Usuarios
  router.use("/users", user);
  router.use("/imgusers", imgusers);

  // Pacientes
  router.use("/patients", patients);
  // Accesos
  router.use("/access", access);
  // Collaborators
  router.use("/collaborators", verifyToken, collaborators);
  // InfoDoctors
  router.use("/infodoctors", infoDoctors);

  //Doctors
  router.use("/doctors", verifyToken, doctors);

  // Appointment
  router.use("/appointment", verifyToken, appointment);

  //Payment
  router.use("/payment", verifyToken, payment);

  app.use(api_url, router);

  // Fotos Tickets
  router.use("/imgqrwp", imgqrwp);
}
