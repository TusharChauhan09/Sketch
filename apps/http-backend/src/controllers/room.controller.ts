import { Request, Response } from "express";

export const room = async (req: Request, res: Response): Promise<any> => {
  res.send("room id ");
};
