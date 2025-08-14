import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const emailAndPasswordDto = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type emailAndPasswordDto = z.infer<typeof emailAndPasswordDto>;
