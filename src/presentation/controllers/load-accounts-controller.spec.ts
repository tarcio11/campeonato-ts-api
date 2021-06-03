import { LoadAccountsController } from './load-accounts-controller'
import { LoadAccountsSpy } from '../tests/mocks'

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
})
