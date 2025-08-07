import { Request, Response } from "express";
import Jwt  from "jsonwebtoken";

export const signup = async (req: Request, res: Response): Promise<any> => {

  res.send("signup");
};

export const signin = async (req: Request, res: Response): Promise<any> => {
  const userId = 1;
  let JWT_SECRET = "sketch"
  const token = Jwt.sign({userId},JWT_SECRET);
  res.send(token);
};
