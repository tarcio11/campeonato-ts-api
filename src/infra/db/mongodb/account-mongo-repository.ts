import { AddAccountRepository } from '../../../data/protocols'
import { MongoHelper } from './mongo-helper'
export class AccountMongoRepository implements AddAccountRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = accountCollection.insertOne(data)
    return (await result).ops[0] !== null
  }
}
