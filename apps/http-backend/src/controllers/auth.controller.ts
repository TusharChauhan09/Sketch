import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { genToken } from "../lib/genToken";

import { SigninSchema, SignupSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedData = SignupSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Incorrect input",
      });
    }

    const { email, password, name } = parsedData.data;

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    try{
      const user = await prismaClient.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });
      res.status(201).json({
        message: "User created successfully",
      });
    }
    catch (err) {
      console.error(err);
      return res.status(400).json({
        message: "user already exists",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error!!!!!!!!!!!!!!!!",
    });
  }
};

export const signin = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedData = SigninSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Incorrect input",
      });
    }
    const { email, password } = parsedData.data;

    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword = user.password;

    const checkPassword = await bcrypt.compare(password, hashedPassword);

    if (!checkPassword) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    genToken(user.id, res);
    return res.status(200).json({
      message: "User signed in successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
