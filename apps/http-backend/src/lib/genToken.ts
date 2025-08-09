import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { Response } from "express";

export const genToken = (userId: string, res: Response): void => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "8h" });

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
    })
    .json({
      message: "Token generated successfully",
    });
};
