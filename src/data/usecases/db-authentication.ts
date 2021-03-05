import { Authentication } from '../../domain/usecases'
import { HashComparer, LoadAccountByEmailRepository } from '../protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
    if (account) {
      await this.hashComparer.compare(authenticationParams.password, account.password)
    }
    return await Promise.resolve(null)
  }
}
