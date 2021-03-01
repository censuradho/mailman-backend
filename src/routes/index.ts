import { Router } from 'express'

// routes
import userRoutes from './userRoutes'

const routes = Router()

routes.use(String(process.env.BASE_URL), userRoutes)

export default routes
