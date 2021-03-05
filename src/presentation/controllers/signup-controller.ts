import { Controller, EmailValidator, HttpRequest, HttpResponse, Validation } from '../protocols'
import { badRequest, ok, serverError } from '../helpers'
import { AddAccount } from '../../domain/usecases'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const accountIsValid = await this.addAccount.add({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
      })
      return ok(accountIsValid)
    } catch (error) {
      return serverError(error)
    }
  }
}
