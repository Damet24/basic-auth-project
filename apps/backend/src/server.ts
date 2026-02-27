import express,  { type NextFunction,type Request,type Response } from 'express'
import helmet from 'helmet'
import { config } from './config'
import userRouter from './routes/user'
import authRouter from './routes/auth'
import httpStatus from 'http-status'
import loggerHttp from 'pino-http'
import { logger } from './di'

const app = express()

app.use(loggerHttp())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.use(helmet.hidePoweredBy())
app.use(helmet.frameguard({ action: 'deny' }))

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

app.use((req: Request, res: Response, _next: NextFunction) => {
  logger.info(`${req.method} - ${req.url} - ${httpStatus[404]}`)
  res.status(httpStatus.NOT_FOUND).json({ error: httpStatus.NOT_FOUND, body: httpStatus[404] });
})

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.stack)
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
})

app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`)
})
