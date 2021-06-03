import { AccountModel } from '../../../../domain/models'

export interface LoadAccountsRepository {
  loadAll: (accountId: string) => Promise<LoadAccountsRepository.Result>
}

export namespace LoadAccountsRepository {
  export type Result = AccountModel
}
