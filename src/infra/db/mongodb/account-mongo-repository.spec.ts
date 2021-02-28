import { AccountMongoRepository } from './account-mongo-repository'
import { MongoHelper } from './mongo-helper'

import faker from 'faker'

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const addAccountParams = ({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })
    const isValid = await sut.add(addAccountParams)
    expect(isValid).toBe(true)
  })
})
