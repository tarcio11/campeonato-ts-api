import { SignUpController } from './signup-controller'
import { InvalidParamError, MissingParamError, ServerError } from '../errors'
import { badRequest, ok, serverError } from '../helpers'
import { AddAccountSpy, EmailValidatorSpy } from '../tests/mocks'
import { HttpRequest, Validation } from '../protocols'

import faker from 'faker'

class ValidationSpy implements Validation {
  input: any
  error: Error = null

  validate (input: any): Error {
    this.input = input
    return this.error
  }
}

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
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  const sut = new SignUpController(emailValidatorSpy, addAccountSpy, validationSpy)
  return {
    sut,
    emailValidatorSpy,
    addAccountSpy,
    validationSpy
  }
}

describe('SignUp Controller', () => {
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
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
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
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut, addAccountSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addAccountSpy.result))
  })

  test('Should calls Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
