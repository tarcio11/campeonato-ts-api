import { AccountAvatarController } from './account-avatar-controller'
import { UpdateAvatarSpy, ValidationSpy } from '../tests/mocks'
import { badRequest, serverError } from '../helpers'
import { MissingParamError, ServerError } from '../errors'

import faker from 'faker'

type SutTypes = {
  sut: AccountAvatarController
  validationSpy: ValidationSpy
  updateAvatarSpy: UpdateAvatarSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const updateAvatarSpy = new UpdateAvatarSpy()
  const sut = new AccountAvatarController(validationSpy, updateAvatarSpy)
  return {
    sut,
    validationSpy,
    updateAvatarSpy
  }
}

describe('AccountAvatarController', () => {
  test('Should call Validation with correct name', async () => {
    const { sut, validationSpy } = makeSut()
    const request = {
      name: faker.internet.url(),
      accountId: null
    }
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const request = {
      name: faker.internet.url(),
      accountId: null
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should calls UpdateAvatar with correct values', async () => {
    const { sut, updateAvatarSpy } = makeSut()
    const request = ({
      accountId: faker.random.uuid(),
      name: faker.internet.url()
    })
    await sut.handle(request)
    expect(updateAvatarSpy.avatar).toEqual(request)
  })

  test('Should return 500 if UpdateAvatar throws', async () => {
    const { sut, updateAvatarSpy } = makeSut()
    jest.spyOn(updateAvatarSpy, 'update').mockImplementationOnce(() => { throw new Error() })
    const request = ({
      accountId: faker.random.uuid(),
      name: faker.internet.url()
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
