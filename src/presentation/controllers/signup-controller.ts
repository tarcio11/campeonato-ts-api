import { Controller, EmailValidator, HttpRequest, HttpResponse, Validation } from '../protocols'
import { InvalidParamError, MissingParamError } from '../errors'
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
      this.validation.validate(request)
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
