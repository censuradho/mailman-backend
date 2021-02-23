import { Router } from 'express'

import userController from '@controllers/UserController'

const userRoutes = Router()

userRoutes.post('/user', userController.store)

export default userRoutes
