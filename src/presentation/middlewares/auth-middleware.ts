import { HttpResponse, Middleware } from '../protocols'
import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers'

export class AuthMiddleware implements Middleware {
  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
