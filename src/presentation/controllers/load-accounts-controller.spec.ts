import { LoadAccountsController } from './load-accounts-controller'
import { LoadAccountsSpy } from '../tests/mocks'
import { noContent, ok, serverError } from '../helpers'

type SutTypes = {
  sut: LoadAccountsController
  loadAccountsSpy: LoadAccountsSpy
}

const makeSut = (): SutTypes => {
  const loadAccountsSpy = new LoadAccountsSpy()
  const sut = new LoadAccountsController(loadAccountsSpy)
  return {
    sut,
    loadAccountsSpy
  }
}

describe('LoadAccounts Controller', () => {
  test('Should call LoadAccounts', async () => {
    const { sut, loadAccountsSpy } = makeSut()
    await sut.handle()
    expect(loadAccountsSpy.load).toBe(loadAccountsSpy.load)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadAccountsSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(loadAccountsSpy.result))
  })

  test('Should return 204 if LoadAccounts return empty', async () => {
    const { sut, loadAccountsSpy } = makeSut()
    loadAccountsSpy.result = []
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadAccounts throws', async () => {
    const { sut, loadAccountsSpy } = makeSut()
    jest.spyOn(loadAccountsSpy, 'load').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
