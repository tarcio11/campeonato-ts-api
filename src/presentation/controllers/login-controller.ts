import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'
import { Authentication } from '../../domain/usecases'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = request.body
      if (!email) {
        return badRequest(new MissingParamError('email'))
      }
      if (!password) {
        return badRequest(new MissingParamError('password'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      await this.authentication.auth({
        email,
        password
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
