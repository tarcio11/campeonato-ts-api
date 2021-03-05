import { Controller, HttpRequest, HttpResponse, Validation } from '../protocols'
import { Authentication } from '../../domain/usecases'
import { badRequest, ok, serverError, unauthorized } from '../helpers'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = request.body
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
