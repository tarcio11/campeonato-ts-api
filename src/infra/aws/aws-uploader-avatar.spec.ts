import { AwsUploaderAvatar } from './aws-uploader-avatar'
import { mockUploadAvatarParams } from '../../domain/tests/mocks'

import { S3 } from 'aws-sdk'
import faker from 'faker'

S3.prototype.putObject = jest.fn().mockImplementation(() => ({
  promise: async () => await Promise.resolve()
}))

jest.mock('../../main/config/env', () => ({
  bucketName: 'aws-bucket',
  defaultRegion: 'region',
  defaultFilesACL: 'private'
}))

const mockDate = (): number => {
  const timestamp = faker.random.number()
  global.Date.now = jest.fn().mockReturnValueOnce(timestamp)
  return timestamp
}

const makeSut = (): AwsUploaderAvatar => new AwsUploaderAvatar()

describe('AwsUploaderAvatar', () => {
  test('should call putObject with correct options', async () => {
    const sut = makeSut()
    const putObjectSpy = jest.spyOn(S3.prototype, 'putObject')
    const uploadAvatarParams = mockUploadAvatarParams()
    const timestamp = mockDate()
    await sut.upload(uploadAvatarParams)
    expect(putObjectSpy).toHaveBeenCalledWith({
      Bucket: 'aws-bucket',
      ContentType: uploadAvatarParams.type,
      Body: uploadAvatarParams.content,
      Key: `${uploadAvatarParams.name}-${timestamp}.${uploadAvatarParams.extension}`,
      ACL: 'private'
    })
  })
})
