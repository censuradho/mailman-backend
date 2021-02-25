import { Router } from 'express'

import SurveyController from '@controllers/SurveyController'

const surveyRoutes = Router()

surveyRoutes.post('/survey', SurveyController.store)
surveyRoutes.get('/survey', SurveyController.index)


export default surveyRoutes
