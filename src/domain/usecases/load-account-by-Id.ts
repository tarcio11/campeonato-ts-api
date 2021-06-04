import { AccountModel } from '../models/account'

export interface LoadAccountById {
  load: (accountId: string) => Promise<LoadAccountById.Result>
}

export namespace LoadAccountById {
  export type Result = AccountModel
}
