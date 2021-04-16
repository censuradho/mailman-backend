import { Router } from 'express'

import trainingController from '@controllers/trainingController'

import pagination from '@middleware/pagination'

const trainingRoutes = Router()

trainingRoutes.post('/training', trainingController.store)
trainingRoutes.get('/training', pagination(), trainingController.index)
trainingRoutes.get('/training/:id', trainingController.show)

export default trainingRoutes
