import express from 'express'
import helmet from 'helmet'
import { config } from './config'
import userRouter from './routes/user'
import authRouter from './routes/auth'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.use(helmet.hidePoweredBy())
app.use(helmet.frameguard({ action: 'deny' }))

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`)
})
