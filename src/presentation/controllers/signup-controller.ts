import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password']
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(request.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
