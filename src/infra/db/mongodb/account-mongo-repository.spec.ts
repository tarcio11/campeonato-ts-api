import { AccountMongoRepository } from './account-mongo-repository'
import { MongoHelper } from './mongo-helper'
import { mockAddAccountParams } from '../../../domain/tests/mocks'

import { Collection } from 'mongodb'
import faker from 'faker'

let accountCollection: Collection

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('AccountMongoRepository', () => {
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

  describe('add()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const isValid = await sut.add(mockAddAccountParams())
      expect(isValid).toBe(true)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(addAccountParams)
      const account = await sut.loadByEmail(addAccountParams.email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
      expect(account.password).toBe(addAccountParams.password)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail(faker.internet.email())
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const res = await accountCollection.insertOne(addAccountParams)
      const fakeAccount = res.ops[0]
      expect(fakeAccount.accessToken).toBeFalsy()
      const accessToken = faker.random.uuid()
      await sut.updateAccessToken(fakeAccount._id, accessToken)
      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe(accessToken)
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true if email is valid', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(addAccountParams)
      const exist = await sut.checkByEmail(addAccountParams.email)
      expect(exist).toBeTruthy()
    })
  })

  describe('loadByToken()', () => {
    let name = faker.name.findName()
    let email = faker.internet.email()
    let password = faker.internet.password()
    let accessToken = faker.random.uuid()

    beforeEach(() => {
      name = faker.name.findName()
      email = faker.internet.email()
      password = faker.internet.password()
      accessToken = faker.random.uuid()
    })

    test('Should return an account on loadByToken without accessToken', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })
      const account = await sut.loadByToken(accessToken)
      expect(account.id).toBeTruthy()
    })

    test('Should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })
      const account = await sut.loadByToken(accessToken, 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should return null on loadByToken with invalid role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })
      const account = await sut.loadByToken(accessToken, 'admin')
      expect(account).toBeFalsy()
    })

    test('Should return an account on loadByToken with if user is admin', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })
      const account = await sut.loadByToken(accessToken, 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken(faker.random.uuid())
      expect(account).toBeFalsy()
    })
  })

  describe('loadById()', () => {
    test('Should return true if loadById on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const account = await accountCollection.insertOne(addAccountParams)
      const fakeAccount = account.ops[0]
      const exist = await sut.loadById(fakeAccount._id)
      expect(exist.id).toBeTruthy()
    })
  })

  describe('updateAvatar()', () => {
    test('Should update the account avatar on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const res = await accountCollection.insertOne(addAccountParams)
      const fakeAccount = res.ops[0]
      expect(fakeAccount.avatar).toBeFalsy()
      const avatar = faker.image.avatar()
      await sut.updateAvatar(fakeAccount._id, avatar)
      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account).toBeTruthy()
      expect(account.avatar).toBe(avatar)
    })
  })

  describe('loadAll()', () => {
    test('Should load all accounts on success', async () => {
      const addAccountModels = [mockAddAccountParams(), mockAddAccountParams()]
      await accountCollection.insertMany(addAccountModels)
      const sut = makeSut()
      const accounts = await sut.loadAll()
      expect(accounts.length).toBe(2)
      expect(accounts[0].name).toBe(addAccountModels[0].name)
      expect(accounts[1].name).toBe(addAccountModels[1].name)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadAccountById()', () => {
    test('Should load an account on success', async () => {
      const account = await accountCollection.insertOne(mockAddAccountParams())
      const sut = makeSut()
      const fakeAccount = account.ops[0]
      const result = await sut.loadAccountById(fakeAccount._id)
      expect(fakeAccount._id).toBeTruthy()
      expect(fakeAccount.name).toBe(result.name)
      expect(fakeAccount.email).toBe(result.email)
    })
  })
})
