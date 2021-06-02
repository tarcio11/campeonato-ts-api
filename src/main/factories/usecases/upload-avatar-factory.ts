import { AccountMongoRepository } from '../../../infra/db/mongodb'
import { UpdateAvatar } from '../../../domain/usecases'
import { DbUpdateAvatar } from '../../../data/usecases'

export const makeDbUpdateAvatar = (): UpdateAvatar => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbUpdateAvatar(accountMongoRepository, accountMongoRepository)
}
