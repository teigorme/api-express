import { Router, type Request, type Response } from "express";
import { hash, genSalt } from "bcrypt";
import { prisma } from "@/src/shared/prisma";
import { StatusCodes } from "http-status-codes";
import validate from "express-zod-safe";
import { createAccountDto } from "@/src/routes/auth/dto/create-account.dto";
import type { Empty } from "@/src/@types/empty";
import { registry } from "@/src/docs/registry";

registry.registerPath({
  method: "post",
  path: "/api/create-account",
  tags: ["auth"],
  description: "Create a new user",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createAccountDto,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Account successfully created",
    },
    400: {
      description: "Email already exists",
    },
  },
});

const router = Router();

router.post(
  "/create-account",
  validate({
    body: createAccountDto,
  }),
  async (
    request: Request<Empty, Empty, createAccountDto>,
    response: Response
  ) => {
    const { email, name, password } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) return response.status(StatusCodes.BAD_REQUEST).send();

    const salt = await genSalt();

    const hashedPassword = await hash(password, salt);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return response.status(StatusCodes.CREATED).send();
  }
);

export { router as createAccountRouter };
