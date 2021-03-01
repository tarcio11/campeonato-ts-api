import { SignUpController } from '../../../presentation/controllers'
import { DbAddAccount } from '../../../data/usecases'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { BcryptAdapter } from '../../../infra/cryptography'
import { AccountMongoRepository } from '../../../infra/db/mongodb'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
