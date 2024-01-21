import { Router } from "express";

import ConnectionHandler from "../controllers/ConnectionController";

const connectionHandler = new ConnectionHandler();

const router = Router();

// infodoctors
router.get("/wp", connectionHandler.isConnectionAvailableWp);

export default router;
