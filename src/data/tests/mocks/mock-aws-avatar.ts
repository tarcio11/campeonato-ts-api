import { UploadedAvatar } from '../../protocols'

import faker from 'faker'

export class UploadedAvatarSpy implements UploadedAvatar {
  options: UploadedAvatar.Params
  result = {
    avatar_url: faker.image.avatar()
  }

  async upload (options: UploadedAvatar.Params): Promise<UploadedAvatar.Result> {
    this.options = options
    return this.result
  }
}
