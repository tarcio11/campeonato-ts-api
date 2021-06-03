import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb'

import { Collection } from 'mongodb'
import request from 'supertest'

let accountCollection: Collection

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
        .send()
        .expect(403)
    })
  })
})
