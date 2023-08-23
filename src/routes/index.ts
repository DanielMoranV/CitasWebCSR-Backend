import { Express, Router } from "express";

import user from "./user";
import verifyToken from "../midlewares/verifyToken";
import access from "./access";
import collaborators from "./collaborator";

export async function useRouter(app: Express, api_url: string) {
  //version 1

  const router = Router();

  // Usuarios
  router.use("/users", user);
  // Accesos
  router.use("/access", access);

  // Collaborators
  router.use("/collaborators", verifyToken, collaborators);
  app.use(api_url, router);
}
