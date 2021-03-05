import { DbAuthentication } from './db-authentication'
import { LoadAccountByEmailRepositorySpy } from '../tests/mocks'
import { mockAuthenticationParams } from '../../domain/tests/mocks'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new DbAuthentication(loadAccountByEmailRepositorySpy)
  return {
    sut,
    loadAccountByEmailRepositorySpy
  }
}

describe('DbAuthentication', () => {
  test('Should calls LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email)
  })
})
