import { DbLoadAccounts } from './db-load-accounts'
import { LoadAccountsRepositorySpy } from '../tests/mocks'

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
    expect(loadAccountsRepositorySpy.result).toBe(await sut.load())
  })

  test('Should return a list of accounts on success', async () => {
    const { sut, loadAccountsRepositorySpy } = makeSut()
    const accounts = await sut.load()
    expect(accounts).toEqual(loadAccountsRepositorySpy.result)
  })

  test('Should throw if LoadAccountsRepository throws', async () => {
    const { sut, loadAccountsRepositorySpy } = makeSut()
    jest.spyOn(loadAccountsRepositorySpy, 'loadAll').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
