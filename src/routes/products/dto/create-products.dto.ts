import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const createProductsDto = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1),
  stock: z.int().positive().min(1),
});

export type createProductsDto = z.infer<typeof createProductsDto>;
