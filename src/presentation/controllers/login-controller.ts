import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'
import { Authentication } from '../../domain/usecases'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, ok, serverError, unauthorized } from '../helpers'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = request.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const authenticationModel = await this.authentication.auth({ password, email })
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
