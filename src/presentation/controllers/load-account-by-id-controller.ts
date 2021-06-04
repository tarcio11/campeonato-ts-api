import { Controller, HttpResponse } from '../protocols'
import { LoadAccountById } from '../../domain/usecases'
import { unauthorized } from '../helpers'

export class LoadAccountByIdController implements Controller {
  constructor (private readonly loadAccountById: LoadAccountById) {}

  async handle (request: LoadAccountByIdController.Request): Promise<HttpResponse> {
    const accountModel = await this.loadAccountById.load(request.accountId)
    if (!accountModel) {
      return unauthorized()
    }
    return null
  }
}

export namespace LoadAccountByIdController {
  export type Request = {
    accountId: string
  }
}
