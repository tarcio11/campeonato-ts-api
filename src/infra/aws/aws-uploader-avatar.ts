import { S3 } from 'aws-sdk'
import env from '../../main/config/env'

import { UploadedAvatar } from '../../data/protocols'

export class AwsUploaderAvatar implements UploadedAvatar {
  private readonly client: S3
  private readonly bucketName = env.bucketName

  constructor () {
    this.client = new S3({
      region: env.defaultRegion
    })
  }

  async upload (file: UploadedAvatar.Params): Promise<UploadedAvatar.Result> {
    await this.client
      .putObject({
        Bucket: this.bucketName,
        Key: file.name,
        ContentType: file.type,
        Body: file.content,
        ACL: env.defaultFilesACL
      })
      .promise()

    return null
  }
}
