import { Router } from 'express'

import userController from '@controllers/user/UserController'
import lookupController from '@controllers/user/LookupController'

import pagination from '@middleware/pagination'
import authorization from '@middleware/authorization'
const userRoutes = Router()

userRoutes.post('/user', userController.store)
userRoutes.get('/user/:id', pagination(), userController.show)
userRoutes.get('/user', pagination(), userController.index)
userRoutes.delete('/user/:id', userController.delete)
userRoutes.patch('/user/:id', userController.update)
userRoutes.get('/user/lookup/:email', lookupController.index)

export default userRoutes
