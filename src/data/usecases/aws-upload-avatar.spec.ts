import { AwsUploadAvatar } from './aws-upload-avatar'
import { UploadedAvatarSpy } from '../tests/mocks'
import { mockUploadAvatarParams } from '../../domain/tests/mocks'

type SutTypes = {
  sut: AwsUploadAvatar
  uploadedAvatarSpy: UploadedAvatarSpy
}

const makeSut = (): SutTypes => {
  const uploadedAvatarSpy = new UploadedAvatarSpy()
  const sut = new AwsUploadAvatar(uploadedAvatarSpy)
  return {
    sut,
    uploadedAvatarSpy
  }
}

describe('UploadAvatar', () => {
  test('Should calls UploadedAvatar with correct options', async () => {
    const { sut, uploadedAvatarSpy } = makeSut()
    const uploadAvatarParams = mockUploadAvatarParams()
    await sut.upload(uploadAvatarParams)
    expect(uploadedAvatarSpy.options).toEqual(uploadAvatarParams)
  })

  test('Should throws if UploadedAvatar throws', async () => {
    const { sut, uploadedAvatarSpy } = makeSut()
    jest.spyOn(uploadedAvatarSpy, 'upload').mockImplementationOnce(() => { throw new Error() })
    const uploadAvatarParams = mockUploadAvatarParams()
    const promise = sut.upload(uploadAvatarParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should return avatar_url if UploadedAvatar on success', async () => {
    const { sut, uploadedAvatarSpy } = makeSut()
    const avatarModel = await sut.upload(mockUploadAvatarParams())
    expect(avatarModel.avatar_url).toEqual(uploadedAvatarSpy.result.avatar_url)
  })
})
