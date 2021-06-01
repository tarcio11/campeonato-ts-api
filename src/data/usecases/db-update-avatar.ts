import { UpdateAvatar } from '../../domain/usecases'
import { LoadAccountByIdRepository, UpdateAvatarRepository } from '../protocols'

export class DbUpdateAvatar implements UpdateAvatar {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly updateAvatarRepository: UpdateAvatarRepository
  ) {}

  async update (avatar: UpdateAvatar.Params): Promise<UpdateAvatar.Result> {
    const account = await this.loadAccountByIdRepository.loadById(avatar.accountId)
    if (account) {
      await this.updateAvatarRepository.updateAvatar(account.id, avatar.name)
    }
    return null
  }
}
