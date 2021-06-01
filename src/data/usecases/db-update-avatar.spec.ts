import { DbUpdateAvatar } from './db-update-avatar'
import { LoadAccountByIdRepositorySpy } from '../tests/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbUpdateAvatar
  loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
  const sut = new DbUpdateAvatar(loadAccountByIdRepositorySpy)
  return {
    sut,
    loadAccountByIdRepositorySpy
  }
}

describe('UpdateAvatar', () => {
  test('Should Calls LoadAccountByIdRepository with correct accountId', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    const accountId = faker.random.uuid()
    const name = faker.image.avatar()
    await sut.update({ accountId, name })
    expect(loadAccountByIdRepositorySpy.accountId).toBe(accountId)
  })
})
