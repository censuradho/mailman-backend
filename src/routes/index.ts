import { Router } from 'express'

// routes
import userRoutes from './userRoutes'
import sessionRoutes from './SessionRoutes'
import trainingSheetRoutes from './TrainingSheetRoutes'
import muscleRoutes from './muscleRoutes'
import training from './trainingRoutes'

const routes = Router()

routes.use(String(process.env.BASE_URL), userRoutes)
routes.use(String(process.env.BASE_URL), sessionRoutes)
routes.use(String(process.env.BASE_URL), trainingSheetRoutes)
routes.use(String(process.env.BASE_URL), muscleRoutes)
routes.use(String(process.env.BASE_URL), training)

export default routes
