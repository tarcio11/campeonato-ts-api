import { LoadAccounts } from '../../domain/usecases'
import { LoadAccountsRepository } from '../protocols'

export class DbLoadAccounts implements LoadAccounts {
  constructor (private readonly loadAccountsRepository: LoadAccountsRepository) {}

  async load (accountId: string): Promise<LoadAccounts.Result> {
    await this.loadAccountsRepository.loadAll(accountId)
    return null
  }
}
