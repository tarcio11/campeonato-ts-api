import { Controller, HttpResponse, Validation } from '../protocols'
import { badRequest, ok, serverError } from '../helpers'
import { AddAccount } from '../../domain/usecases'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = request
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

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
  }
}
