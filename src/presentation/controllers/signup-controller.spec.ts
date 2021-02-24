import { SignUpController } from './signup-controller'
import { InvalidParamError, MissingParamError, ServerError } from '../errors'
import { badRequest } from '../helpers'
import { EmailValidatorSpy } from '../tests/mocks'

import faker from 'faker'

type SutTypes = {
  sut: SignUpController
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new SignUpController(emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
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
    const request = {
      body: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should calls EmailValidator with correct email', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    const email = faker.internet.email()
    const request = {
      body: {
        name: faker.name.findName(),
        email,
        password: faker.internet.password()
      }
    }
    await sut.handle(request)
    expect(emailValidatorSpy.email).toBe(email)
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => { throw new Error() })
    const request = {
      body: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
