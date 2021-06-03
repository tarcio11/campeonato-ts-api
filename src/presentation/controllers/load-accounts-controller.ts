import { Controller, HttpResponse } from '../protocols'
import { LoadAccounts } from '../../domain/usecases'
import { noContent, ok, serverError } from '../helpers'

export class LoadAccountsController implements Controller {
  constructor (private readonly loadAccounts: LoadAccounts) {}

  async handle (): Promise<HttpResponse> {
    try {
      const accountModels = await this.loadAccounts.load()
      return accountModels.length ? ok(accountModels) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
