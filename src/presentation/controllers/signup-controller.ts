import { Controller, HttpRequest, HttpResponse, Validation } from '../protocols'
import { badRequest, ok, serverError } from '../helpers'
import { AddAccount } from '../../domain/usecases'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = request.body
      const isValid = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok(isValid)
    } catch (error) {
      return serverError(error)
    }
  }
}
