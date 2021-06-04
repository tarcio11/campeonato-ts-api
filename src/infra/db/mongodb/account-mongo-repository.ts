import { MongoHelper } from './mongo-helper'
import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository, UpdateAvatarRepository, LoadAccountByIdRepository, LoadAccountsRepository, LoadAccountByIdResultRepository } from '../../../data/protocols'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, CheckAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAvatarRepository, LoadAccountByIdRepository, LoadAccountsRepository, LoadAccountByIdResultRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = accountCollection.insertOne(data)
    return (await result).ops[0] !== null
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        name: 1,
        password: 1
      }
    })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: token
      }
    })
  }

  async checkByEmail (email: string): Promise<boolean> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return account
  }

  async loadByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    }, {
      projection: {
        _id: 1
      }
    })
    return account && MongoHelper.map(account)
  }

  async loadById (accountId: string): Promise<LoadAccountByIdRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      _id: accountId
    }, {
      projection: {
        _id: 1
      }
    })
    return account && MongoHelper.map(account)
  }

  async updateAvatar (accountId: string, avatar: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: accountId
    }, {
      $set: {
        avatar
      }
    })
  }

  async loadAll (): Promise<LoadAccountsRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const accounts = await accountCollection.find().toArray()
    return MongoHelper.accountMap(accounts)
  }

  async loadAccountById (accountId: string): Promise<LoadAccountByIdResultRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ _id: new ObjectId(accountId) })
    return account && MongoHelper.accountMap(account)
  }
}
