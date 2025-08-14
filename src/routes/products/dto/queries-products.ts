import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const queriesProducts = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  q: z.coerce.string().optional(),
});

export type queriesProducts = z.infer<typeof queriesProducts>;
