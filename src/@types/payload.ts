import type { Roles } from "@/generated/prisma";

export type Payload = {
  sub: string;
  role: Roles;
};
