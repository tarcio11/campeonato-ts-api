import { MissingParamError } from '../errors'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  async handle (request: HttpRequest): Promise<HttpResponse> {
    if (!request.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    return {
      statusCode: 400,
      body: new MissingParamError('email')
    }
  }
}
