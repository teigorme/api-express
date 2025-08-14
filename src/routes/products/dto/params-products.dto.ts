import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const paramsProducts = z.object({
  id: z.coerce.string().describe("UUID"),
});
export type paramsProducts = z.infer<typeof paramsProducts>;
