import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "@/src/shared/prisma";
import { Payload } from "@/src/@types/payload";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]!;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Payload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.sub},
      select: { id: true, role: true },
    });

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401);
  }
};
