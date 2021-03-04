import { LoginController } from './login-controller'
import { HttpRequest } from '../protocols'
import { Authentication } from '../../domain/usecases'
import { InvalidParamError, MissingParamError, ServerError } from '../errors'
import { EmailValidatorSpy } from '../tests/mocks'
import { badRequest, serverError } from '../helpers'

import faker from 'faker'

const mockRequest = (): HttpRequest => {
  return {
    body: {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
  }
}

class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}

type SutTypes = {
  sut
  emailValidatorSpy: EmailValidatorSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new LoginController(emailValidatorSpy, authenticationSpy)
  return {
    sut,
    emailValidatorSpy,
    authenticationSpy
  }
}

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const request = {
      body: {
        password: faker.internet.password()
      }
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const request = {
      body: {
        email: faker.internet.email()
      }
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should calls EmailValidator with correct email', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(emailValidatorSpy.email).toBe(request.body.email)
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should calls Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(authenticationSpy.params).toEqual({
      email: request.body.email,
      password: request.body.password
    })
  })
})
