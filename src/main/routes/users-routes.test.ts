import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb'
import env from '../config/env'

import { Collection } from 'mongodb'
import request from 'supertest'
import { sign } from 'jsonwebtoken'

let accountCollection: Collection

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Tarcio',
    email: 'tarcio.mail@gmail.com',
    password: '123'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Users Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('PATCH /users/avatar', () => {
    test('Should return 403 on update avatar result without accessToken', async () => {
      await request(app)
        .patch('/api/users/avatar')
        .send({
          accountId: 'any_accountId',
          name: 'http://any_image.com'
        })
        .expect(403)
    })
  })

  describe('GET /users', () => {
    test('Should return 403 on load accounts result without accessToken', async () => {
      await request(app)
        .get('/api/users')
        .expect(403)
    })

    test('Should return 200 on load accounts with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .get('/api/users')
        .set('x-access-token', accessToken)
        .send()
        .expect(200)
    })
  })
})
