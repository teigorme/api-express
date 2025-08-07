import { z } from "zod";

export const createAccountDto = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
});
export type createAccountDto = z.infer<typeof createAccountDto>;
