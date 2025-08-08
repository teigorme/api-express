import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(
	z
)

export const createAccountDto =
	z.object(
		{
			name: z.string(),
			email:
				z.email(),
			password:
				z
					.string()
					.min(
						6
					),
		}
	)
export type createAccountDto =
	z.infer<
		typeof createAccountDto
	>
