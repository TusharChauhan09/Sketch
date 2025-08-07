import { Request, Response } from "express";
import Jwt  from "jsonwebtoken";

import { SigninSchema } from '@repo/common/types';

export const signup = async (req: Request, res: Response): Promise<any> => {
  const data =  SigninSchema.safeParse(req.body);

  if(!data.success){
    return res.json({
      message:"Incorrect input"
    })
  }

  res.send("signup");
};

export const signin = async (req: Request, res: Response): Promise<any> => {
  const userId = 1;
  let JWT_SECRET = "sketch"
  const token = Jwt.sign({userId},JWT_SECRET);
  res.send(token);
};
