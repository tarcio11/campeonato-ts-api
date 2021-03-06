import { makeLoginValidation } from './login-validation-factory'
import { LogControllerDecorator } from '../../decorators'
import { LoginController } from '../../../presentation/controllers'
import { Controller } from '../../../presentation/protocols'
import { DbAuthentication } from '../../../data/usecases/db-authentication'
import { AccountMongoRepository, LogMongoRepository } from '../../../infra/db/mongodb'
import { BcryptAdapter, JwtAdapter } from '../../../infra/cryptography'
import env from '../../config/env'

export const makeLoginController = (): Controller => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const signUpController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
