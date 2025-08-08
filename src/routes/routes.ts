import { Router } from 'express'
import { createAccountRouter } from '@/src/routes/auth/create-account'
import { emailAndPasswordRouter } from '@/src/routes/auth/email-and-password'
const routes = Router()
// Routes
routes.use(createAccountRouter)
routes.use(emailAndPasswordRouter)
export { routes }
