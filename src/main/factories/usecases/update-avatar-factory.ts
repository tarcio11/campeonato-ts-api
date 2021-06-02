import { AwsUploaderAvatar } from '../../../infra/aws'
import { UploadAvatar } from '../../../domain/usecases'
import { AwsUploadAvatar } from '../../../data/usecases/aws-upload-avatar'

export const makeAwsUploadAvatar = (): UploadAvatar => {
  const uploadedAvatar = new AwsUploaderAvatar()
  return new AwsUploadAvatar(uploadedAvatar)
}
