import { Controller, HttpResponse, Validation } from '../protocols'
import { badRequest, ok, serverError } from '../helpers'
import { UpdateAvatar, UploadAvatar } from '../../domain/usecases'

export class AccountAvatarController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateAvatar: UpdateAvatar,
    private readonly uploadAvatar: UploadAvatar
  ) {}

  async handle (request: UpdateAvatarController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { name, type, content, size, extension, accountId } = request
      const avatar = await this.uploadAvatar.upload({ name, type, content, size, extension })
      const avatarModel = await this.updateAvatar.update({ accountId, name: avatar.avatar_url })
      return ok({
        avatar: avatarModel.avatar,
        avatar_url: `https://${avatar.avatar_url}`
      })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateAvatarController {
  export type Request = {
    accountId: string
    name: string
    type: string
    content: string
    size: number
    extension: string
  }
}
