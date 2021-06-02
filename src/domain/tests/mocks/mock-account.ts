import { AddAccount, Authentication, UploadAvatar } from '../../usecases'

import faker from 'faker'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockUploadAvatarParams = (): UploadAvatar.Params => ({
  name: faker.image.avatar(),
  type: 'image/jpg',
  content: faker.image.image(),
  size: faker.random.number(10),
  extension: 'jpg'
})
