import { Controller, HttpRequest, HttpResponse } from '../protocols'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'

export class LoginController implements Controller {
  async handle (request: HttpRequest): Promise<HttpResponse> {
    if (!request.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    if (!request.body.password) {
      return badRequest(new MissingParamError('password'))
    }
  }
}
