import { LoadAccountById } from '../../domain/usecases'
import { LoadAccountByIdResultRepository } from '../protocols'

export class DbLoadAccountById implements LoadAccountById {
  constructor (private readonly loadAccountByIdResultRepository: LoadAccountByIdResultRepository) {}

  async load (accountId: string): Promise<LoadAccountById.Result> {
    await this.loadAccountByIdResultRepository.loadAccountById(accountId)
    return null
  }
}
