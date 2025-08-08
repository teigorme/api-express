import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { routes } from '@/src/routes/routes'
import { errorHandler } from '@/src/middlewares/error.middleware'
import { notFoundHandler } from '@/src/middlewares/not-found.middleware'
import { openApiSpec } from '@/src/docs/swagger'
import { env } from '@/src/shared/env'
import { logger } from '@/src/shared/logger'

const PORT =
	env.PORT
const app =
	express()

app.use(
	express.json()
)
app.use(
	helmet()
)
app.use(
	cors()
)
app.use(
	logger
)

app.use(
	'/api',
	routes
)
app.use(
	'/api/docs',
	swaggerUi.serve,
	swaggerUi.setup(
		openApiSpec
	)
)
app.get(
	'/api/docs.json',
	(
		_,
		res
	) => {
		res.json(
			openApiSpec
		)
	}
)
app.get(
	'/',
	(
		_,
		response
	) => {
		response.json(
			{
				message:
					'Good Luck',
			}
		)
	}
)
app.use(
	errorHandler
)
app.use(
	notFoundHandler
)

app.listen(
	PORT,
	() => {
		logger.logger.info(
			`🚀 Server running on http://localhost:${PORT}/api/docs`
		)
	}
)

export default app
