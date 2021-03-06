import env from '../../config/env'
import { DbAuthentication } from '../../../data/usecases/db-authentication'
import { AccountMongoRepository } from '../../../infra/db/mongodb'
import { BcryptAdapter, JwtAdapter } from '../../../infra/cryptography'
import { Authentication } from '../../../domain/usecases'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
