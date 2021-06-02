import { AccountAvatarController } from './account-avatar-controller'
import { ValidationSpy } from '../tests/mocks'

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
})
