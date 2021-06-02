import { Controller, HttpResponse, Validation } from '../protocols'
import { badRequest, serverError } from '../helpers'
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
      const { name, type, content, size, extension } = request
      await this.uploadAvatar.upload({ name, type, content, size, extension })
      await this.updateAvatar.update(request)
      return null
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
