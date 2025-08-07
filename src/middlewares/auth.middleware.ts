import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "@/src/shared/prisma";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]!;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true },
    });

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
  }
};
