import express from "express";
import { createRoom, getChats } from "../controllers/room.controller";
import { authMiddleware } from "../middlewares/authMiddleware";


const router: express.Router = express.Router();

router.get("/chat", authMiddleware, getChats);

router.post("/room",authMiddleware ,createRoom);

export default router;