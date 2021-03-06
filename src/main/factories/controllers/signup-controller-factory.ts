import { SignUpController } from '../../../presentation/controllers'
import { Controller } from '../../../presentation/protocols'
import { DbAddAccount, DbAuthentication } from '../../../data/usecases'
import { BcryptAdapter, JwtAdapter } from '../../../infra/cryptography'
import { AccountMongoRepository, LogMongoRepository } from '../../../infra/db/mongodb'
import { LogControllerDecorator } from '../../decorators'
import { makeSignUpValidation } from './signup-validation-factory'
import env from '../../config/env'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation(), dbAuthentication)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
