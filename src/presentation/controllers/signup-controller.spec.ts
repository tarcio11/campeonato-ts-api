import { SignUpController } from './signup-controller'
import { EmailInUseError, MissingParamError, ServerError } from '../errors'
import { badRequest, forbidden, ok, serverError } from '../helpers'
import { AddAccountSpy, ValidationSpy } from '../tests/mocks'
import { mockAddAccountParams } from '../../domain/tests/mocks'

import faker from 'faker'

type SutTypes = {
  sut: SignUpController
  addAccountSpy: AddAccountSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  const sut = new SignUpController(addAccountSpy, validationSpy)
  return {
    sut,
    addAccountSpy,
    validationSpy
  }
}

describe('SignUp Controller', () => {
  test('Should calls AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockAddAccountParams()
    await sut.handle(request)
    expect(addAccountSpy.params).toEqual(request)
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockAddAccountParams())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 403 if AddAccount returns false', async () => {
    const { sut, addAccountSpy } = makeSut()
    addAccountSpy.result = false
    const httpResponse = await sut.handle(mockAddAccountParams())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut, addAccountSpy } = makeSut()
    const httpResponse = await sut.handle(mockAddAccountParams())
    expect(httpResponse).toEqual(ok(addAccountSpy.result))
  })

  test('Should calls Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockAddAccountParams()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockAddAccountParams())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
