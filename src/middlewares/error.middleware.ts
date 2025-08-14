import { ForbiddenError } from "@casl/ability";
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ForbiddenError) {
    return res.status(403).send({
      status: "forbidden",
      message: err.message,
    });
  }


  return res.status(500).json({
    message: "Erro interno do servidor",
    error:
      process.env.NODE_ENV === "development"
        ? (err as Error).message
        : undefined,
  });
};
