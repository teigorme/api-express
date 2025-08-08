import type {
	Request,
	Response,
	NextFunction,
} from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '@/src/shared/prisma'
import type { Payload } from '@/src/@types/payload'
import { env } from '@/src/shared/env'

export const authenticate =
	async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const token =
				req.headers.authorization?.split(
					' '
				)[1]
			if (
				!token
			) {
				return res.status(
					401
				)
			}

			const decoded =
				jwt.verify(
					token,
					env.JWT_SECRET
				) as Payload

			const {
				id,
				role,
			} =
				await prisma.user.findUniqueOrThrow(
					{
						where:
							{
								id: decoded.sub,
							},
						select:
							{
								id: true,
								role: true,
							},
					}
				)

			req.user =
				{
					sub: id,
					role,
				}
			return next()
		} catch (_error) {
			return res.status(
				401
			)
		}
	}
