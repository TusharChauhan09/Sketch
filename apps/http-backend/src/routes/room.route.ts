import express from "express";
import { createRoom, getShapes } from "../controllers/room.controller";
import { authMiddleware } from "../middlewares/authMiddleware";


const router: express.Router = express.Router();

router.get("/shapes/:roomId", authMiddleware, getShapes);

router.post("/room",authMiddleware ,createRoom);

export default router;