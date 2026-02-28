import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { authenticate } from '../middlewares/authenticate'

const authRouter = Router()

const authController = new AuthController()

authRouter.post('/login', authController.login.bind(authController))
authRouter.post('/register', authController.register.bind(authController))
authRouter.put('/password', authenticate, authController.updatePassword.bind(authController))

export default authRouter as Router
