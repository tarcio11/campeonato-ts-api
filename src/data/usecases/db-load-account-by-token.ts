import { LoadAccountByToken } from '../../domain/usecases'
import { Decrypter } from '../protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    try {
      await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
    return null
  }
}
