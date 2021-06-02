import { Controller, HttpResponse, Validation } from '../protocols'
import { badRequest } from '../helpers'
import { UpdateAvatar } from '../../domain/usecases'

export class AccountAvatarController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateAvatar: UpdateAvatar
  ) {}

  async handle (request: UpdateAvatarController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    await this.updateAvatar.update(request)
    return null
  }
}

export namespace UpdateAvatarController {
  export type Request = {
    accountId: string
    name: string
  }
}
