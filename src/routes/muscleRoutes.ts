import { Router } from 'express'

import muscleController from '@controllers/muscleController'

const muscleRoutes = Router()

muscleRoutes.post('/muscle', muscleController.store)
muscleRoutes.get('/muscle', muscleController.index)

export default muscleRoutes
