import { Router, type Request, type Response } from "express";
import { prisma } from "@/src/shared/prisma";
import { StatusCodes } from "http-status-codes";
import validate from "express-zod-safe";
import { registry } from "@/src/docs/registry";
import { queriesProducts } from "@/src/routes/products/dto/queries-products";
import { Empty } from "@/src/@types/empty";
import { Prisma } from "@/generated/prisma";
import z from "zod";

registry.registerPath({
    method: "get",
    path: "/api/products",
    tags: ["products"],
    request: {
        query: queriesProducts,
    },
    responses: {
        200: {
            description: "",
            content: {
                "application/json": {
                    schema: z.object({
                        items: z.array(
                            z.object({
                                id: z.uuid(),
                                name: z.string(),
                                price: z.number().int(),
                                user: z.object({
                                    id: z.uuid(),
                                    name: z.string(),
                                }),
                            })
                        ),
                        total: z.int(),
                        page: z.int(),
                        limit: z.int(),
                        pages: z.int(),
                    }),
                },
            },
        },
    },
});

const router = Router();

router.get(
    "/products",
    validate({ query: queriesProducts }),
    async (
        request: Request<Empty, Empty, Empty, queriesProducts>,
        response: Response
    ) => {
        const { page, limit, q } = request.query;

        const where: Prisma.ProductWhereInput = {
            isAvailable: true,
            ...(q && {
                name: {
                    contains: q,
                    mode: Prisma.QueryMode.insensitive,
                },
                description: {
                    contains: q,
                    mode: Prisma.QueryMode.insensitive,
                },
            }),
        };

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
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
            }),
            prisma.product.count({ where }),
        ]);

        return response.status(StatusCodes.OK).send({
            items: products,
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        });
    }
);

export { router as getProductsRouter };
