import { LoadAccountsController } from './load-accounts-controller'
import { LoadAccountsSpy } from '../tests/mocks'
import { ok } from '../helpers'

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
})
