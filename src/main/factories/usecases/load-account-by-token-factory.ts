import env from '../../config/env'
import { DbLoadAccountByToken } from '../../../data/usecases'
import { LoadAccountByToken } from '../../../domain/usecases'
import { JwtAdapter } from '../../../infra/cryptography'
import { AccountMongoRepository } from '../../../infra/db/mongodb'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
