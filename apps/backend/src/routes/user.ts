import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authenticate } from '../middlewares/authenticate'
import { authorize } from '../middlewares/authorize'
import { UserRole } from '@packages/domain/index'

const userRouter = Router()

const userController = new UserController()

userRouter.get('/', userController.index.bind(userController))
userRouter.get('/me', authenticate, authorize(UserRole.ADMIN), userController.me.bind(userController))

export default userRouter as Router
