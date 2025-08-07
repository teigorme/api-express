// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Validação do express-zod-safe
  if (err?.type === "body" && Array.isArray(err?.errors)) {
    return res.status(400).json({
      message: "Erro de validação",
      errors: err.errors.map((e: any) => e.message),
    });
  }

  // Erro genérico
  return res.status(500).json({
    message: "Erro interno do servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
}
