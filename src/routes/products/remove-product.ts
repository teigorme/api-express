import { Router, type Request, type Response } from "express";
import { prisma } from "@/src/shared/prisma";
import { StatusCodes } from "http-status-codes";
import validate from "express-zod-safe";
import { paramsProducts } from "@/src/routes/products/dto/params-products.dto";
import { registry } from "@/src/docs/registry";

registry.registerPath({
  method: "delete",
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
    204: {
      description: "",
    },
    404: { description: "" },
  },
});

const router = Router();

router.delete(
  "/products/:id",
  validate({ params: paramsProducts }),
  async (request: Request<paramsProducts>, response: Response) => {
    const { id } = request.params;

    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return response.status(StatusCodes.NOT_FOUND).send();
    }

    await prisma.product.delete({ where: { id } });

    return response.status(StatusCodes.NO_CONTENT).send();
  }
);

export { router as deleteProductRouter };
