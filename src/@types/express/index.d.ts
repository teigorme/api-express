import type { Payload } from "@/src/@types/payload";

declare global {
        namespace Express {
                interface Request {
                        user: Payload;
                }
        }
}
