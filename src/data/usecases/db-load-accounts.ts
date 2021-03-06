import { LoadAccounts } from '../../domain/usecases'
import { LoadAccountsRepository } from '../protocols'

export class DbLoadAccounts implements LoadAccounts {
  constructor (private readonly loadAccountsRepository: LoadAccountsRepository) {}

  async load (): Promise<LoadAccounts.Result> {
    return await this.loadAccountsRepository.loadAll()
  }
}
