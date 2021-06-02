import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
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
})
