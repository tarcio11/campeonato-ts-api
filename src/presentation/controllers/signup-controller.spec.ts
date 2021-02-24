import { SignUpController } from './signup-controller'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers'
import { AddAccountSpy, EmailValidatorSpy } from '../tests/mocks'
import { HttpRequest } from '../protocols'

import faker from 'faker'

const mockRequest = (): HttpRequest => {
  const email = faker.internet.email()
  return {
    body: {
      name: faker.name.findName(),
      email,
      password: faker.internet.email()
    }
  }
}

type SutTypes = {
  sut: SignUpController
  emailValidatorSpy: EmailValidatorSpy
  addAccountSpy: AddAccountSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const addAccountSpy = new AddAccountSpy()
  const sut = new SignUpController(emailValidatorSpy, addAccountSpy)
  return {
    sut,
    emailValidatorSpy,
    addAccountSpy
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const request = {
      body: {
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const request = {
      body: {
        name: faker.name.findName(),
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
        name: faker.name.findName(),
        email: faker.internet.email()
      }
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should calls EmailValidator with correct email', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(emailValidatorSpy.email).toBe(request.body.email)
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError())
  })

  test('Should calls AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountSpy.params).toEqual(request.body)
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError())
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut, addAccountSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toBe(addAccountSpy.result)
  })
})
