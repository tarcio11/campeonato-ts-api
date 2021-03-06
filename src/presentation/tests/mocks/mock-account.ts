import { AddAccount, Authentication, LoadAccountById, LoadAccountByToken, LoadAccounts, UpdateAvatar } from '../../../domain/usecases'

import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result = true

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string
  role?: string
  result = {
    id: faker.random.uuid()
  }

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}

export class UpdateAvatarSpy implements UpdateAvatar {
  avatar: UpdateAvatar.Params
  result = {
    avatar: faker.image.avatar(),
    avatar_url: faker.internet.url()
  }

  async update (avatar: UpdateAvatar.Params): Promise<UpdateAvatar.Result> {
    this.avatar = avatar
    return this.result
  }
}

export class LoadAccountsSpy implements LoadAccounts {
  result = [{
    id: faker.random.uuid(),
    name: faker.image.avatar(),
    email: faker.internet.email(),
    avatar: faker.internet.url()
  }]

  async load (): Promise<LoadAccounts.Result> {
    return this.result
  }
}

export class LoadAccountByIdSpy implements LoadAccountById {
  accountId: string
  result = {
    id: faker.random.uuid(),
    name: faker.image.avatar(),
    email: faker.internet.email(),
    avatar: faker.internet.url()
  }

  async load (accountId: string): Promise<LoadAccountById.Result> {
    this.accountId = accountId
    return this.result
  }
}
