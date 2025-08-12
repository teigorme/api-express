import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const queriesProducts = z.object({
    page: z.string().optional().default("1").transform(Number),
    limit: z.string().optional().default("10").transform(Number),
    q: z.string().optional(),
});

export type queriesProducts = z.infer<typeof queriesProducts>;
