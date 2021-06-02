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

  private generateFileKey (file: UploadedAvatar.Params, timestamp: number): string {
    return `${file.name}-${timestamp}.${file.extension}`
  }

  private async uploadFile (file: UploadedAvatar.Params): Promise<UploadedAvatar.Result> {
    const timestamp = Date.now()
    const fileKey = this.generateFileKey(file, timestamp)
    await this.client
      .putObject({
        Bucket: this.bucketName,
        Key: fileKey,
        ContentType: file.type,
        Body: file.content,
        ACL: env.defaultFilesACL
      })
      .promise()

    return {
      avatar_url: `${this.bucketName}/${fileKey}`
    }
  }

  async upload (file: UploadedAvatar.Params): Promise<UploadedAvatar.Result> {
    const avatarModel = await this.uploadFile(file)
    return avatarModel
  }
}
