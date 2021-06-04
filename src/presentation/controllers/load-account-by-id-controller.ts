import { Controller, HttpResponse } from '../protocols'
import { LoadAccountById } from '../../domain/usecases'

export class LoadAccountByIdController implements Controller {
  constructor (private readonly loadAccountById: LoadAccountById) {}

  async handle (request: LoadAccountByIdController.Request): Promise<HttpResponse> {
    await this.loadAccountById.load(request.accountId)
    return null
  }
}

export namespace LoadAccountByIdController {
  export type Request = {
    accountId: string
  }
}
