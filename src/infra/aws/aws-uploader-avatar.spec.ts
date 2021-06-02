import { AwsUploaderAvatar } from './aws-uploader-avatar'
import { mockUploadAvatarParams } from '../../domain/tests/mocks'

import { S3 } from 'aws-sdk'

S3.prototype.putObject = jest.fn().mockImplementation(() => ({
  promise: async () => await Promise.resolve()
}))

jest.mock('../../main/config/env', () => ({
  bucketName: 'aws-bucket',
  defaultRegion: 'region',
  defaultFilesACL: 'private'
}))

const makeSut = (): AwsUploaderAvatar => new AwsUploaderAvatar()

describe('AwsUploaderAvatar', () => {
  test('should call putObject for a single file', async () => {
    const sut = makeSut()
    const putObjectSpy = jest.spyOn(S3.prototype, 'putObject')
    const uploadAvatarParams = mockUploadAvatarParams()
    await sut.upload(uploadAvatarParams)
    expect(putObjectSpy).toHaveBeenCalledWith({
      Bucket: 'aws-bucket',
      ContentType: uploadAvatarParams.type,
      Body: uploadAvatarParams.content,
      Key: uploadAvatarParams.name,
      ACL: 'private'
    })
  })
})
