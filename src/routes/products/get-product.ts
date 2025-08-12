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
                        user: z.object({
                            id: z.uuid(),
                            name: z.string(),
                        }),
                    }),
                },
            },
        },
        404: { description: "" },
    },
});

const router = Router();

router.post(
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
                user: {
                    select: {
                        id: true,
                        name: true,
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
