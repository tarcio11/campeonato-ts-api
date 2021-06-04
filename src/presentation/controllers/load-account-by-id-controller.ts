import { Controller, HttpResponse } from '../protocols'
import { LoadAccountById } from '../../domain/usecases'
import { ok, unauthorized } from '../helpers'

export class LoadAccountByIdController implements Controller {
  constructor (private readonly loadAccountById: LoadAccountById) {}

  async handle (request: LoadAccountByIdController.Request): Promise<HttpResponse> {
    const accountModel = await this.loadAccountById.load(request.accountId)
    return accountModel ? ok(accountModel) : unauthorized()
  }
}

export namespace LoadAccountByIdController {
  export type Request = {
    accountId: string
  }
}
