import { LoadAccountByIdController } from './load-account-by-id-controller'
import { LoadAccountByIdSpy } from '../tests/mocks'
import { ok, unauthorized } from '../helpers'

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

  test('Should return 403 if LoadAccountById returns null', async () => {
    const { sut, loadAccountByIdSpy } = makeSut()
    loadAccountByIdSpy.result = null
    const request = {
      accountId: faker.random.uuid()
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 200 on success', async () => {
    const { sut, loadAccountByIdSpy } = makeSut()
    const request = {
      accountId: faker.random.uuid()
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(loadAccountByIdSpy.result))
  })
})
