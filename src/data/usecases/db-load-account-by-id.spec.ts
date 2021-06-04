import { DbLoadAccountById } from './db-load-account-by-id'
import { LoadAccountByIdResultRepositorySpy } from '../tests/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadAccountById
  loadAccountByIdResultRepositorySpy: LoadAccountByIdResultRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByIdResultRepositorySpy = new LoadAccountByIdResultRepositorySpy()
  const sut = new DbLoadAccountById(loadAccountByIdResultRepositorySpy)
  return {
    sut,
    loadAccountByIdResultRepositorySpy
  }
}

describe('DbLoadAccounts', () => {
  test('Should call LoadAccountByIdRepository with correct id', async () => {
    const { sut, loadAccountByIdResultRepositorySpy } = makeSut()
    const accountId = faker.random.uuid()
    await sut.load(accountId)
    expect(loadAccountByIdResultRepositorySpy.accountId).toBe(accountId)
  })

  test('Should return accountModel on success', async () => {
    const { sut, loadAccountByIdResultRepositorySpy } = makeSut()
    const accountResult = await sut.load(faker.random.uuid())
    expect(accountResult).toEqual(loadAccountByIdResultRepositorySpy.result)
  })

  test('Should throw if loadAccountByIdResultRepositorySpy throws', async () => {
    const { sut, loadAccountByIdResultRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByIdResultRepositorySpy, 'loadAccountById').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.load(faker.random.uuid())
    await expect(promise).rejects.toThrow()
  })
})
