import { SignUpController } from '../../../presentation/controllers'
import { Controller } from '../../../presentation/protocols'
import { DbAddAccount } from '../../../data/usecases'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { BcryptAdapter } from '../../../infra/cryptography'
import { AccountMongoRepository, LogMongoRepository } from '../../../infra/db/mongodb'
import { LogControllerDecorator } from '../../decorators'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
