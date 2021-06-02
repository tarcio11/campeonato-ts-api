import { AccountAvatarController } from './account-avatar-controller'
import { ValidationSpy } from '../tests/mocks'
import { badRequest } from '../helpers'
import { MissingParamError } from '../errors'

import faker from 'faker'

type SutTypes = {
  sut: AccountAvatarController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new AccountAvatarController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('AccountAvatarController', () => {
  test('Should call Validation with correct name', async () => {
    const { sut, validationSpy } = makeSut()
    const request = {
      name: faker.internet.url()
    }
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const request = {
      name: faker.internet.url()
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
