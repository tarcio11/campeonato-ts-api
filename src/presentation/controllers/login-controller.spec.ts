import { LoginController } from './login-controller'
import { MissingParamError, ServerError } from '../errors'
import { AuthenticationSpy, ValidationSpy } from '../tests/mocks'
import { badRequest, ok, serverError, unauthorized } from '../helpers'

import faker from 'faker'
import { mockAuthenticationParams } from '../../domain/tests/mocks'

type SutTypes = {
  sut
  authenticationSpy: AuthenticationSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(authenticationSpy, validationSpy)
  return {
    sut,
    authenticationSpy,
    validationSpy
  }
}

describe('Login Controller', () => {
  test('Should calls Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockAuthenticationParams()
    await sut.handle(request)
    expect(authenticationSpy.params).toEqual({
      email: request.email,
      password: request.password
    })
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    authenticationSpy.result = null
    const httpResponse = await sut.handle(mockAuthenticationParams())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockAuthenticationParams())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpResponse = await sut.handle(mockAuthenticationParams())
    expect(httpResponse).toEqual(ok(authenticationSpy.result))
  })

  test('Should calls Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockAuthenticationParams()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockAuthenticationParams())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
