import { Controller, HttpResponse, Validation } from '../protocols'
import { badRequest } from '../helpers'

export class AccountAvatarController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: UpdateAvatarController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}

export namespace UpdateAvatarController {
  export type Request = {
    name: string
  }
}
