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

  test('Should throws if LoadAccountByIdRepository throws', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByIdRepositorySpy, 'loadById').mockImplementationOnce(() => { throw new Error() })
    const accountId = faker.random.uuid()
    const name = faker.image.avatar()
    const promise = sut.update({ accountId, name })
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    loadAccountByIdRepositorySpy.result = null
    const accountId = faker.random.uuid()
    const name = faker.image.avatar()
    const model = await sut.update({ accountId, name })
    expect(model).toBe(null)
  })
})
