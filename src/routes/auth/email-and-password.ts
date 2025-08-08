import { type Request, type Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import validate from 'express-zod-safe'
import {
  token,
  emailAndPasswordDto,
} from '@/src/routes/auth/dto/email-and-password.dto'
import type { Empty } from '@/src/@types/empty'
import { prisma } from '@/src/shared/prisma'
import { compare } from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { env } from '@/src/shared/env'
import { registry } from '@/src/docs/registry'

registry.registerPath({
  method: 'post',
  path: '/api/email-and-password',
  tags: ['auth'],
  description: 'login with email and password',
  request: {
    body: {
      content: {
        'application/json': {
          schema: emailAndPasswordDto,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'JWT successfully created',
      content: {
        'application/json': {
          schema: token,
        },
      },
    },
    400: { description: 'Bad credentials' },
  },
})

const router = Router()

router.post(
  '/email-and-password',
  validate({ body: emailAndPasswordDto }),
  async (
    request: Request<Empty, Empty, emailAndPasswordDto>,
    response: Response
  ) => {
    const { email, password } = request.body
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user || !(await compare(password, user.password)))
      return response.status(StatusCodes.BAD_REQUEST).send()
    const payload = { sub: user.id, role: user.role }

    return response.status(StatusCodes.CREATED).send({
      access_token: jwt.sign(payload, env.JWT_SECRET, { expiresIn: '30min' }),
    })
  }
)

export { router as emailAndPasswordRouter }
