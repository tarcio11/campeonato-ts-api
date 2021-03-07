import { adaptMiddleware } from '../adapters'
import { makeAuthMiddleware } from '../factories/middlewares'

export const AdminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
