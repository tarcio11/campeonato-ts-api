import { AccountAvatarController } from './account-avatar-controller'
import { UpdateAvatarSpy, UploadAvatarSpy, ValidationSpy } from '../tests/mocks'
import { badRequest, ok, serverError } from '../helpers'
import { MissingParamError, ServerError } from '../errors'

import faker from 'faker'

type SutTypes = {
  sut: AccountAvatarController
  validationSpy: ValidationSpy
  updateAvatarSpy: UpdateAvatarSpy
  uploadAvatarSpy: UploadAvatarSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const updateAvatarSpy = new UpdateAvatarSpy()
  const uploadAvatarSpy = new UploadAvatarSpy()
  const sut = new AccountAvatarController(validationSpy, updateAvatarSpy, uploadAvatarSpy)
  return {
    sut,
    validationSpy,
    updateAvatarSpy,
    uploadAvatarSpy
  }
}

describe('AccountAvatarController', () => {
  test('Should call Validation with correct name', async () => {
    const { sut, validationSpy } = makeSut()
    const request = {
      name: faker.internet.url(),
      accountId: null,
      size: null,
      content: null,
      type: null,
      extension: null
    }
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const request = {
      name: faker.internet.url(),
      accountId: null,
      size: null,
      content: null,
      type: null,
      extension: null
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should calls UpdateAvatar with correct values', async () => {
    const { sut, updateAvatarSpy } = makeSut()
    const request = ({
      accountId: faker.random.uuid(),
      name: faker.internet.url(),
      size: null,
      content: null,
      type: null,
      extension: null
    })
    await sut.handle(request)
    expect(updateAvatarSpy.avatar).toEqual({
      accountId: request.accountId,
      name: request.name
    })
  })

  test('Should return 500 if UpdateAvatar throws', async () => {
    const { sut, updateAvatarSpy } = makeSut()
    jest.spyOn(updateAvatarSpy, 'update').mockImplementationOnce(() => { throw new Error() })
    const request = ({
      accountId: faker.random.uuid(),
      name: faker.internet.url(),
      size: null,
      content: null,
      type: null,
      extension: null
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should calls UploadAvatar with correct values', async () => {
    const { sut, uploadAvatarSpy } = makeSut()
    const request = ({
      accountId: faker.random.uuid(),
      name: faker.image.image(),
      size: faker.random.number(10),
      content: faker.random.alphaNumeric(),
      type: '.jpg',
      extension: faker.image.fashion()
    })
    await sut.handle(request)
    expect(uploadAvatarSpy.file).toEqual({
      name: request.name,
      size: request.size,
      content: request.content,
      type: request.type,
      extension: request.extension
    })
  })

  test('Should return 500 if UploadAvatar return throws', async () => {
    const { sut, uploadAvatarSpy } = makeSut()
    jest.spyOn(uploadAvatarSpy, 'upload').mockImplementationOnce(() => { throw new Error() })
    const request = ({
      accountId: faker.random.uuid(),
      name: faker.image.image(),
      size: faker.random.number(10),
      content: faker.random.alphaNumeric(),
      type: '.jpg',
      extension: faker.image.fashion()
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 with data on success', async () => {
    const { sut, updateAvatarSpy, uploadAvatarSpy } = makeSut()

    const request = ({
      accountId: faker.random.uuid(),
      name: faker.internet.url(),
      size: null,
      content: null,
      type: null,
      extension: null
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok({
      avatar: updateAvatarSpy.result.avatar,
      avatar_url: `https://${uploadAvatarSpy.result.avatar_url}`
    }))
  })
})
