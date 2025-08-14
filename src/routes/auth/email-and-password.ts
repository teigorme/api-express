import { type Request, type Response, Router } from "express";
import validate from "express-zod-safe";
import { emailAndPasswordDto } from "@/src/routes/auth/dto/email-and-password.dto";
import type { Empty } from "@/src/@types/empty";
import { prisma } from "@/src/shared/prisma";
import { compare } from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { generateToken } from "@/src/utils/generate-token";
import { registry } from "@/src/docs/registry";
import z from "zod";

registry.registerPath({
  method: "post",
  path: "/api/email-and-password",
  tags: ["auth"],
  description: "login with email and password",
  request: {
    body: {
      content: {
        "application/json": {
          schema: emailAndPasswordDto,
        },
      },
    },
  },
  responses: {
    201: {
      description: "jwt successfully created",
      content: {
        "application/json": {
          schema: z.object({
            access_token: z.string(),
          }),
        },
      },
    },
    400: {
      description: "bad credential",
    },
  },
});

const router = Router();

router.post(
  "/email-and-password",
  validate({
    body: emailAndPasswordDto,
  }),
  async (
    request: Request<Empty, Empty, emailAndPasswordDto>,
    response: Response
  ) => {
    const { email, password } = request.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !(await compare(password, user.password)))
      return response.status(StatusCodes.BAD_REQUEST).send();

    const payload = {
      sub: user.id,
      role: user.role,
    };

    return response.status(StatusCodes.CREATED).send({
      access_token: await generateToken(payload),
    });
  }
);

export { router as emailAndPasswordRouter };
