import { AccountModel } from '../models/account'

export interface LoadAccounts {
  load: (accountId: string) => Promise<LoadAccounts.Result>
}

export namespace LoadAccounts {
  export type Result = AccountModel[]
}
