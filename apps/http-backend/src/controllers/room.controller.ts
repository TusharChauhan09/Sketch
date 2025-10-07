import { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";
import { CreateRoomSchema } from "@repo/common/types";

export const getShapes = async (req: Request, res: Response): Promise<any> => {
  try {
    const roomId = req.params.roomId;
    if (!roomId) {
      return res.status(400).json({
        message: "Room ID is required",
      });
    }

    const chats = await prismaClient.chat.findMany({
      where: {
        roomId : roomId,
      },
      orderBy:{ 
        id: 'desc'
      },
    })

    return res.status(200).json({
      chats: chats || []
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedData = CreateRoomSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Incorrect input",
      });
    }

    const userId = req.userId;

    const { name } = parsedData.data;

    const room = await prismaClient.room.create({
      data: {
        slug: name,
        adminId: userId,
      },
    });
    return res.status(201).json({
      roomId: room.id,
      message: "Room created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
