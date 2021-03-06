import { LogMongoRepository } from './log-mongo-repository'
import { MongoHelper } from './mongo-helper'

import { Collection } from 'mongodb'
import faker from 'faker'

let errorCollection: Collection

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('LogMongoRepository ', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError(faker.random.word())
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
