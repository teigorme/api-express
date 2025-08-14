import { Router, type Request, type Response } from "express";
import { prisma } from "@/src/shared/prisma";
import { StatusCodes } from "http-status-codes";
import type { Empty } from "@/src/@types/empty";
import { registry } from "@/src/docs/registry";
import validate from "express-zod-safe";
import { createOrdersDto } from "@/src/routes/orders/dto/create-orders.dto";

registry.registerPath({
  method: "post",
  path: "/api/orders",
  tags: ["orders"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createOrdersDto,
        },
      },
    },
  },
  responses: {
    201: {
      description: "order successfully created",
    },
    400: { description: "invalid body" },
  },
});

const router = Router();

router.post(
  "/orders",
  validate({ body: createOrdersDto }),
  async (
    request: Request<Empty, Empty, createOrdersDto>,
    response: Response
  ) => {
    const { productId, quantity, totalPrice } = request.body;
    const { sub } = request.user;

    await prisma.order.create({
      data: { totalPrice, productId, quantity, userId: sub },
    });

    return response.status(StatusCodes.CREATED).send();
  }
);

export { router as createOrdersRouter };
