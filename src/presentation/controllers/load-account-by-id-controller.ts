import { Controller, HttpResponse } from '../protocols'
import { ok, serverError, unauthorized } from '../helpers'
import { LoadAccountById } from '../../domain/usecases'

export class LoadAccountByIdController implements Controller {
  constructor (private readonly loadAccountById: LoadAccountById) {}

  async handle (request: LoadAccountByIdController.Request): Promise<HttpResponse> {
    try {
      const accountModel = await this.loadAccountById.load(request.accountId)
      return accountModel ? ok(accountModel) : unauthorized()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadAccountByIdController {
  export type Request = {
    accountId: string
  }
}
