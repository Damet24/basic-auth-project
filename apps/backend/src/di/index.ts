import { Pool } from "pg"
import { config } from "../config"
import { PostgresqlUserRepository } from "../repositories/impementation/postgresql/PostgresqlUserRepository"
import { AuthService } from "../services/AuthService"
import { UserService } from "../services/UserService"
import { BcryptPasswordHasher } from "../services/BcryptPasswordHasher"


const postgrePool = new Pool({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  database: config.database.name,
  password: config.database.password,

})

const passwordHasher = new BcryptPasswordHasher(config.bcrypt.saltRounds)

const userRepository = new PostgresqlUserRepository(postgrePool)
const userService = new UserService(userRepository)
const authService = new AuthService(userRepository, passwordHasher)

export { userService, authService }
