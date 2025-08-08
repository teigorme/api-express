import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { routes } from '@/src/routes/routes'
import { errorHandler } from '@/src/middlewares/error.middleware'
import { notFoundHandler } from '@/src/middlewares/not-found.middleware'
import { openApiSpec } from '@/src/docs/swagger'
import { env } from '@/src/shared/env'

const PORT = env.PORT
const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan('common'))

app.use('/api', routes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec))
app.use(errorHandler)
app.use(notFoundHandler)
app.get('/', (_, response) => {
  response.status(200).json({ message: 'Good Luck' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/api/docs`)
})

export default app
