import { DbAuthentication } from './db-authentication'
import { LoadAccountByEmailRepositorySpy } from '../tests/mocks'
import { mockAuthenticationParams } from '../../domain/tests/mocks'

describe('DbAuthentication', () => {
  test('Should calls LoadAccountByEmailRepository with correct email', async () => {
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
    const sut = new DbAuthentication(loadAccountByEmailRepositorySpy)
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email)
  })
})
