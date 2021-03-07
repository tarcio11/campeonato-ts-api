import { LoadAccountByToken } from '../../domain/usecases'
import { Decrypter, LoadAccountByTokenRepository } from '../protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    try {
      await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
    await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    return null
  }
}
