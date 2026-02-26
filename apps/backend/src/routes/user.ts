import { Router } from 'express'
import { UserController } from '../controllers/UserController'

const userRouter = Router()

const userController = new UserController()

userRouter.get('/', userController.index.bind(userController))

export default userRouter as Router
