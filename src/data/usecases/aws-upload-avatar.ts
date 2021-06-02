import { UploadedAvatar } from '../protocols'
import { UploadAvatar } from '../../domain/usecases'

export class AwsUploadAvatar implements UploadAvatar {
  constructor (private readonly uploadedAvatar: UploadedAvatar) {}

  async upload (file: UploadAvatar.Params): Promise<UploadAvatar.Result> {
    const avatarModel = await this.uploadedAvatar.upload(file)
    return avatarModel
  }
}
