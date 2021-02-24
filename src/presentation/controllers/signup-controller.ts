import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  async handle (request: HttpRequest): Promise<HttpResponse> {
    if (!request.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }
    return {
      statusCode: 400,
      body: new Error('Missing param: email')
    }
  }
}
