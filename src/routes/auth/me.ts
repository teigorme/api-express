import { Router, type Request, type Response } from "express";
import { prisma } from "@/src/shared/prisma";
import { StatusCodes } from "http-status-codes";
import { registry } from "@/src/docs/registry";

registry.registerPath({
  method: "get",
  path: "/api/me",
  tags: ["auth"],
  security: [{ bearerAuth: [] }],
  description: "get user authenticated",
  responses: {
    200: {
      description: "",
    },
    404: {
      description: "user not fount",
    },
  },
});

const router = Router();

router.get("/me", async (request: Request, response: Response) => {
  const { sub } = request.user;
  const user = await prisma.user.findUnique({
    where: { id: sub },
    omit: { password: true },
  });

  if (!user) {
    return response.status(StatusCodes.NOT_FOUND).send();
  }
  return response.status(StatusCodes.OK).send(user);
});

export { router as getMeRouter };
