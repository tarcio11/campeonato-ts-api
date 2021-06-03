import { AccountModel } from '../../../../domain/models'

export interface LoadAccountsRepository {
  loadAll: () => Promise<LoadAccountsRepository.Result>
}

export namespace LoadAccountsRepository {
  export type Result = AccountModel[]
}
