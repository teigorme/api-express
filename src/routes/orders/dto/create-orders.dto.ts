import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const createOrdersDto = z.object({
  productId: z.uuid().min(1),
  quantity: z.int().positive().min(1),
  totalPrice: z.number().min(1),
});

export type createOrdersDto = z.infer<typeof createOrdersDto>;
