import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const updateProductsDto = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  stock: z.number().positive().optional(),
});

export type updateProductsDto = z.infer<typeof updateProductsDto>;
