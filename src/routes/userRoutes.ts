import { Router } from 'express'

import userController from '@controllers/UserController'

const userRoutes = Router()

userRoutes.post('/user', userController.store)
userRoutes.get('/user/:id', userController.show)
userRoutes.get('/user', userController.index)

export default userRoutes
