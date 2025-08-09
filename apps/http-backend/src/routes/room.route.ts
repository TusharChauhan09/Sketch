import express from "express";
import { room } from "../controllers/room.controller";
import { authMiddleware } from "../middlewares/authMiddleware";


const router: express.Router = express.Router();

router.post("/room",authMiddleware ,room);

export default router;