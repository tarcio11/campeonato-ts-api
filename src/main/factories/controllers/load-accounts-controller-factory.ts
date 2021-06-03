import { makeLogControllerDecorator } from '../decorators'
import { makeDbLoadAccounts } from '../usecases'
import { LoadAccountsController } from '../../../presentation/controllers'
import { Controller } from '../../../presentation/protocols'

export const makeLoadAccountsController = (): Controller => {
  const controller = new LoadAccountsController(makeDbLoadAccounts())
  return makeLogControllerDecorator(controller)
}
