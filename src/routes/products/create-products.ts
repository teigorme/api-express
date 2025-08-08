import { Router, type Request, type Response } from "express";
import { prisma } from "@/src/shared/prisma";
import { StatusCodes } from "http-status-codes";
import type { Empty } from "@/src/@types/empty";
import { registry } from "@/src/docs/registry";
import validate from "express-zod-safe";
import { createProductsDto } from "@/src/routes/products/dto/create-products.dto";
const router = Router();

router.post(
        "/products",
        validate({ body: createProductsDto }),
        async (
                request: Request<Empty, Empty, createProductsDto>,
                response: Response
        ) => {
                const { name, price, description, stock } = request.body;
                const { sub } = request.user;
                await prisma.product.create({
                        data: { name, price, description, stock, userId: sub },
                });

                return response.status(StatusCodes.CREATED).send();
        }
);
export { router as createProductsRouter };
