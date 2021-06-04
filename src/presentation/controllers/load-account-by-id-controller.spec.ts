import { LoadAccountByIdController } from './load-account-by-id-controller'
import { LoadAccountByIdSpy } from '../tests/mocks'

import faker from 'faker'

type SutTypes = {
  sut: LoadAccountByIdController
  loadAccountByIdSpy: LoadAccountByIdSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByIdSpy = new LoadAccountByIdSpy()
  const sut = new LoadAccountByIdController(loadAccountByIdSpy)
  return {
    sut,
    loadAccountByIdSpy
  }
}

describe('LoadAccounts Controller', () => {
  test('Should call LoadAccountById with correct id', async () => {
    const { sut, loadAccountByIdSpy } = makeSut()
    const request = {
      accountId: faker.random.uuid()
    }
    await sut.handle(request)
    expect(loadAccountByIdSpy.accountId).toBe(request.accountId)
  })
})
