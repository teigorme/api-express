import { Router } from 'express'
import { createAccountRouter } from '@/src/routes/auth/create-account'
const routes = Router()
// Routes
routes.use(createAccountRouter)

export { routes }
