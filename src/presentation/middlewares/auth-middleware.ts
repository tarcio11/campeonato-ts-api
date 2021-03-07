import { HttpResponse, Middleware } from '../protocols'
import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers'
import { LoadAccountByToken } from '../../domain/usecases'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    const { accessToken } = request
    if (accessToken) {
      await this.loadAccountByToken.load(request.accessToken, this.role)
    }
    return forbidden(new AccessDeniedError())
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
