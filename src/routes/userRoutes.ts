import { Router } from 'express'

import userController from '@controllers/UserController'

import pagnation from '@middleware/pagination'

const userRoutes = Router()

userRoutes.post('/user', userController.store)
userRoutes.get('/user/:id', pagnation(), userController.show)
userRoutes.get('/user', pagnation(), userController.index)
userRoutes.delete('/user/:id', userController.delete)
userRoutes.patch('/user/:id', userController.update)

export default userRoutes
