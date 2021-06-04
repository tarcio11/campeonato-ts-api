import { makeLogControllerDecorator } from '../decorators'
import { makeDbLoadAccountById } from '../usecases'
import { LoadAccountByIdController } from '../../../presentation/controllers'
import { Controller } from '../../../presentation/protocols'

export const makeLoadAccountByIdController = (): Controller => {
  const controller = new LoadAccountByIdController(makeDbLoadAccountById())
  return makeLogControllerDecorator(controller)
}
