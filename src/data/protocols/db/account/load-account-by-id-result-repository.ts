import { AccountModel } from '../../../../domain/models'

export interface LoadAccountByIdResultRepository {
  loadAccountById: (accountId: string) => Promise<LoadAccountByIdResultRepository.Result>
}

export namespace LoadAccountByIdResultRepository {
  export type Result = AccountModel
}
