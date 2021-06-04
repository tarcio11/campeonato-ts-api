import { LoadAccountByIdController } from './load-account-by-id-controller'
import { LoadAccountByIdSpy } from '../tests/mocks'
import { ok, serverError, unauthorized } from '../helpers'

import faker from 'faker'

const mockRequest = (): LoadAccountByIdController.Request => ({
  userId: faker.random.uuid()
})

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
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAccountByIdSpy.accountId).toBe(request.userId)
  })

  test('Should return 403 if LoadAccountById returns null', async () => {
    const { sut, loadAccountByIdSpy } = makeSut()
    loadAccountByIdSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 200 on success', async () => {
    const { sut, loadAccountByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadAccountByIdSpy.result))
  })

  test('Should return 500 if LoadAccountById throws', async () => {
    const { sut, loadAccountByIdSpy } = makeSut()
    jest.spyOn(loadAccountByIdSpy, 'load').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
