import { UploadAvatar } from '../../../domain/usecases'

import faker from 'faker'

export class UploadAvatarSpy implements UploadAvatar {
  file: UploadAvatar.Params
  result = {
    avatar_url: faker.internet.url()
  }

  async upload (file: UploadAvatar.Params): Promise<UploadAvatar.Result> {
    this.file = file
    return this.result
  }
}
