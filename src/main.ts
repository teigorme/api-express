import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { routes } from '@/src/routes/routes'
import { errorHandler } from '@/src/middlewares/error.middleware'
import { notFoundHandler } from '@/src/middlewares/not-found.middleware'

const PORT = process.env.PORT || 3333
const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan('common'))

app.use('/api', routes)
app.use(errorHandler)
app.use(notFoundHandler)
app.get('/', (_, response) => {
  response.status(200).json({ message: 'Good Luck' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

export default app
