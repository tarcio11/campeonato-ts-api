import { Authentication } from '../../domain/usecases'
import { Encrypter, HashComparer, LoadAccountByEmailRepository } from '../protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, account.password)
      if (isValid) {
        await this.encrypter.encrypt(account.id)
      }
    }
    return await Promise.resolve(null)
  }
}
