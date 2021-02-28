import { AddAccount } from '../../domain/usecases'
import { Hasher } from '../protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher) {}

  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    await this.hasher.hash(account.password)
    return null
  }
}
