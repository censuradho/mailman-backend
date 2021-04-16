import { Router } from 'express'

import trainingSheetController from '@controllers/trainingSheet'

const trainingSheetRoutes = Router()

trainingSheetRoutes.post('/training-sheet', trainingSheetController.store)
trainingSheetRoutes.get('/training-sheet', trainingSheetController.index)

export default trainingSheetRoutes