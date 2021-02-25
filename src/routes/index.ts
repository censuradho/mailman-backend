import { Router } from 'express'

// routes
import userRoutes from './userRoutes'
import surveyRoutes from './SurveysRoutes'

const routes = Router()

routes.use(String(process.env.BASE_URL), userRoutes)
routes.use(String(process.env.BASE_URL), surveyRoutes)

export default routes
