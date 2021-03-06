import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAddAccount, makeDbAuthentication } from '../usecases'
import { makeLogControllerDecorator } from '../decorators'
import { SignUpController } from '../../../presentation/controllers'
import { Controller } from '../../../presentation/protocols'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
