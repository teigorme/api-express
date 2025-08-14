import { env } from "@/src/shared/env";
import jwt from "jsonwebtoken";
import type { Payload } from "@/src/@types/payload";

export async function generateToken(payload: Payload): Promise<string> {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "30min",
  });
}

