import { makeAccountAvatarValidation } from './account-avatar-validation-factory'
import { makeAwsUploadAvatar, makeDbUpdateAvatar } from '../usecases'
import { makeLogControllerDecorator } from '../decorators'
import { AccountAvatarController } from '../../../presentation/controllers'
import { Controller } from '../../../presentation/protocols'

export const makeAccountAvatarController = (): Controller => {
  const controller = new AccountAvatarController(makeAccountAvatarValidation(), makeDbUpdateAvatar(), makeAwsUploadAvatar())
  return makeLogControllerDecorator(controller)
}
