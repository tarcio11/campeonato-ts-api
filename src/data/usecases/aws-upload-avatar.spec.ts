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
})
