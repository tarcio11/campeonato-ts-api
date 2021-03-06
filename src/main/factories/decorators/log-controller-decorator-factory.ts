import { Controller } from '../../../presentation/protocols'
import { LogMongoRepository } from '../../../infra/db/mongodb'
import { LogControllerDecorator } from '../../decorators'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
