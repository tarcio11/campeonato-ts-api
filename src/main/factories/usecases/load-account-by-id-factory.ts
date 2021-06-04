import { DbLoadAccountById } from '../../../data/usecases'
import { LoadAccountById } from '../../../domain/usecases'
import { AccountMongoRepository } from '../../../infra/db/mongodb'

export const makeDbLoadAccountById = (): LoadAccountById => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountById(accountMongoRepository)
}
