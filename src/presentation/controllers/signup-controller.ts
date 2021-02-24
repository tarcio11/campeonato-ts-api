import { Controller, HttpRequest, HttpResponse } from '../protocols'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'

export class SignUpController implements Controller {
  async handle (request: HttpRequest): Promise<HttpResponse> {
    if (!request.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    return badRequest(new MissingParamError('email'))
  }
}
