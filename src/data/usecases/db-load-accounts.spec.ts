import { DbLoadAccounts } from './db-load-accounts'
import { LoadAccountsRepositorySpy } from '../tests/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadAccounts
  loadAccountsRepositorySpy: LoadAccountsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountsRepositorySpy = new LoadAccountsRepositorySpy()
  const sut = new DbLoadAccounts(loadAccountsRepositorySpy)
  return {
    sut,
    loadAccountsRepositorySpy
  }
}

describe('DbLoadAccounts', () => {
  test('Should call LoadAccountsRepository', async () => {
    const { sut, loadAccountsRepositorySpy } = makeSut()
    const accountId = faker.random.uuid()
    await sut.load(accountId)
    expect(loadAccountsRepositorySpy.accountId).toBe(accountId)
  })
})
