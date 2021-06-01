import { UpdateAvatar } from '../../domain/usecases'
import { LoadAccountByIdRepository } from '../protocols'

export class DbUpdateAvatar implements UpdateAvatar {
  constructor (private readonly loadAccountByIdRepository: LoadAccountByIdRepository) {}

  async update (avatar: UpdateAvatar.Params): Promise<UpdateAvatar.Result> {
    await this.loadAccountByIdRepository.loadById(avatar.accountId)
    return null
  }
}
