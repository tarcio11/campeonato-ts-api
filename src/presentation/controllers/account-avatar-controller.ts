import { Controller, Validation } from '../protocols'
import { HttpResponse } from 'aws-sdk'

export class AccountAvatarController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: UpdateAvatarController.Request): Promise<HttpResponse> {
    await this.validation.validate(request)
    return null
  }
}

export namespace UpdateAvatarController {
  export type Request = {
    name: string
  }
}
