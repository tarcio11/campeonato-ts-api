import { DbUpdateAvatar } from './db-update-avatar'
import { LoadAccountByIdRepositorySpy, UpdateAvatarRepositorySpy } from '../tests/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbUpdateAvatar
  loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
  updateAvatarRepositorySpy: UpdateAvatarRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
  const updateAvatarRepositorySpy = new UpdateAvatarRepositorySpy()
  const sut = new DbUpdateAvatar(loadAccountByIdRepositorySpy, updateAvatarRepositorySpy)
  return {
    sut,
    loadAccountByIdRepositorySpy,
    updateAvatarRepositorySpy
  }
}

let accountId: string
let name: string

describe('UpdateAvatar', () => {
  beforeEach(async () => {
    accountId = faker.random.uuid()
    name = faker.internet.url()
  })

  test('Should Calls LoadAccountByIdRepository with correct accountId', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    await sut.update({ accountId, name })
    expect(loadAccountByIdRepositorySpy.accountId).toBe(accountId)
  })

  test('Should throws if LoadAccountByIdRepository throws', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByIdRepositorySpy, 'loadById').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.update({ accountId, name })
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    loadAccountByIdRepositorySpy.result = null
    const model = await sut.update({ accountId, name })
    expect(model).toBe(null)
  })

  test('Should calls UpdateAvatarRepository with correct values', async () => {
    const { sut, updateAvatarRepositorySpy, loadAccountByIdRepositorySpy } = makeSut()
    await sut.update({ accountId, name })
    expect(updateAvatarRepositorySpy.accountId).toBe(loadAccountByIdRepositorySpy.result.id)
    expect(updateAvatarRepositorySpy.avatar).toBe(name)
  })

  test('Should throw if UpdateAvatarRepository throws', async () => {
    const { sut, updateAvatarRepositorySpy } = makeSut()
    jest.spyOn(updateAvatarRepositorySpy, 'updateAvatar').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.update({ accountId, name })
    await expect(promise).rejects.toThrow()
  })

  test('Should return an data on success', async () => {
    const { sut, updateAvatarRepositorySpy } = makeSut()
    const avatarModel = await sut.update({ accountId, name })
    expect(avatarModel.avatar).toBe(updateAvatarRepositorySpy.avatar)
    expect(avatarModel.avatar_url).toBe(updateAvatarRepositorySpy.avatar)
  })
})
