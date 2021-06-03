import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, LoadAccountByIdRepository, LoadAccountByTokenRepository, LoadAccountsRepository, UpdateAvatarRepository } from '../../protocols'

import faker from 'faker'
import { UpdateAccessTokenRepository } from '../../protocols/db/account/update-access-token-repository'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result = true

  async add (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = params
    return this.result
  }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: string
  result = false

  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  result: LoadAccountByEmailRepository.Result = {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    password: faker.internet.password()
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  token: string
  role: string
  result = {
    id: faker.random.uuid()
  }

  async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    this.token = token
    this.role = role
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}

export class LoadAccountByIdRepositorySpy implements LoadAccountByIdRepository {
  accountId: string
  result = {
    id: faker.random.uuid()
  }

  async loadById (accountId: string): Promise<LoadAccountByIdRepository.Result> {
    this.accountId = accountId
    return this.result
  }
}

export class UpdateAvatarRepositorySpy implements UpdateAvatarRepository {
  accountId: string
  avatar: string

  async updateAvatar (accountId: string, avatar: string): Promise<void> {
    this.accountId = accountId
    this.avatar = avatar
  }
}

export class LoadAccountsRepositorySpy implements LoadAccountsRepository {
  result = [{
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar()
  }]

  async loadAll (): Promise<LoadAccountsRepository.Result> {
    return this.result
  }
}
