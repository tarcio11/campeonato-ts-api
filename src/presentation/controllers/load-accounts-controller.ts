import { Controller, HttpResponse } from '../protocols'
import { LoadAccounts } from '../../domain/usecases'
import { noContent, ok } from '../helpers'

export class LoadAccountsController implements Controller {
  constructor (private readonly loadAccounts: LoadAccounts) {}

  async handle (): Promise<HttpResponse> {
    const accountModels = await this.loadAccounts.load()
    return accountModels.length ? ok(accountModels) : noContent()
  }
}
