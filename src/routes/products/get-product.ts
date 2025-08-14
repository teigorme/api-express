import { Router, type Request, type Response } from "express";
import { prisma } from "@/src/shared/prisma";
import { StatusCodes } from "http-status-codes";
import validate from "express-zod-safe";
import { registry } from "@/src/docs/registry";
import { paramsProducts } from "@/src/routes/products/dto/params-products.dto";
import z from "zod";

registry.registerPath({
  method: "get",
  path: "/api/products/{id}",
  tags: ["products"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    params: paramsProducts,
  },
  responses: {
    200: {
      description: "",
      content: {
        "application/json": {
          schema: z.object({
            id: z.uuid(),
            name: z.string(),
            price: z.int(),
            description: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
            user: z.object({
              id: z.uuid(),
              name: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
        },
      },
    },
    404: { description: "" },
  },
});

const router = Router();

router.get(
  "/products/:id",
  validate({ params: paramsProducts }),
  async (request: Request<paramsProducts>, response: Response) => {
    const { id } = request.params;

    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!product) {
      return response.status(StatusCodes.NOT_FOUND).send();
    }

    return response.status(StatusCodes.OK).send(product);
  }
);

export { router as getProductRouter };
