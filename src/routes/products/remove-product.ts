import { Router, type Request, type Response } from "express";
import { prisma } from "@/src/shared/prisma";
import { StatusCodes } from "http-status-codes";
import validate from "express-zod-safe";
import { paramsProducts } from "@/src/routes/products/dto/params-products.dto";
import { registry } from "@/src/docs/registry";
import { defineAbilityFor } from "@/src/shared/abilities";
import { ForbiddenError, subject } from "@casl/ability";

registry.registerPath({
  method: "delete",
  path: "/api/products/{id}",
  tags: ["products"],
  security: [{ bearerAuth: [] }],
  request: { params: paramsProducts },
  responses: {
    204: { description: "" },
    403: { description: "" },
    404: { description: "" },
  },
});

const router = Router();

router.delete(
  "/products/:id",
  validate({ params: paramsProducts }),
  async (request: Request<paramsProducts>, response: Response) => {
    const { id } = request.params;
    const { sub, role } = request.user;

    const ability = defineAbilityFor({ id: sub, role });

    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return response.status(StatusCodes.NOT_FOUND).send();
    }

    ForbiddenError.from(ability).throwUnlessCan(
      "delete",
      subject("Product", product)
    );

    await prisma.product.delete({ where: { id } });
    return response.status(StatusCodes.NO_CONTENT).send();
  }
);

export { router as deleteProductRouter };
