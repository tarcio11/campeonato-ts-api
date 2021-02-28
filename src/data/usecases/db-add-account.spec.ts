import { DbAddAccount } from './db-add-account'
import { AddAccount } from '../../domain/usecases'
import { Hasher } from '../protocols'

import faker from 'faker'

const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

class HasherSpy implements Hasher {
  digest = faker.random.uuid()
  plaintext: string
  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.digest
  }
}

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const sut = new DbAddAccount(hasherSpy)
  return {
    sut,
    hasherSpy
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Hasher with correct plaintext', async () => {
    const { sut, hasherSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(hasherSpy.plaintext).toBe(addAccountParams.password)
  })

  test('Should throw Hasher if throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })
})
