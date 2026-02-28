import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authenticate } from '../middlewares/authenticate'
import { authorize } from '../middlewares/authorize'
import { UserRole } from '@packages/domain/index'

const userRouter = Router()

const userController = new UserController()

userRouter.get('/', authenticate, authorize(UserRole.ADMIN), userController.index.bind(userController))
userRouter.get('/me', authenticate, userController.me.bind(userController))
userRouter.put('/me', authenticate, userController.update.bind(userController))
userRouter.put('/:id', authenticate, userController.updateById.bind(userController))
userRouter.delete('/:id', authenticate, authorize(UserRole.ADMIN), userController.delete.bind(userController))

export default userRouter as Router
