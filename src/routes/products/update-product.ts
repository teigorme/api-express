import { Router, type Request, type Response } from "express";
import { prisma } from "@/src/shared/prisma";
import { StatusCodes } from "http-status-codes";
import validate from "express-zod-safe";
import { updateProductsDto } from "@/src/routes/products/dto/update-products.dto";
import { paramsProducts } from "@/src/routes/products/dto/params-products.dto";
import { Empty } from "@/src/@types/empty";
import { registry } from "@/src/docs/registry";

registry.registerPath({
  method: "patch",
  path: "/api/products/{id}",
  tags: ["products"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: updateProductsDto,
        },
      },
    },
    params: paramsProducts,
  },
  responses: {
    200: {
      description: "",
    },
    404: { description: "" },
  },
});

const router = Router();

router.patch(
  "/products/:id",
  validate({ body: updateProductsDto, params: paramsProducts }),
  async (
    request: Request<paramsProducts, Empty, updateProductsDto>,
    response: Response
  ) => {
    const { id } = request.params;

    const { name, price, description, stock } = request.body;

    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return response.status(StatusCodes.NOT_FOUND).send();
    }

    await prisma.product.update({
      where: { id },
      data: { name, price, description, stock },
    });

    return response.status(StatusCodes.OK).send();
  }
);

export { router as updateProductRouter };
