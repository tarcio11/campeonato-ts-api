import { HttpResponse } from 'aws-sdk'
import { LoadAccounts } from '../../domain/usecases'
import { Controller } from '../protocols'

export class LoadAccountsController implements Controller {
  constructor (private readonly loadAccounts: LoadAccounts) {}

  async handle (): Promise<HttpResponse> {
    await this.loadAccounts.load()
    return null
  }
}
