import { SignUpController } from '../../../presentation/controllers'
import { Controller } from '../../../presentation/protocols'
import { DbAddAccount } from '../../../data/usecases'
import { BcryptAdapter } from '../../../infra/cryptography'
import { AccountMongoRepository, LogMongoRepository } from '../../../infra/db/mongodb'
import { LogControllerDecorator } from '../../decorators'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
