import { Hasher } from '../protocols/cryptography/hasher'
import { AddAccount } from '../../domain/usecases'
import { DbAddAccount } from './db-add-account'

import faker from 'faker'

const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

describe('DbAddAccount UseCase', () => {
  test('Should call Hasher with correct plaintext', async () => {
    class HasherSpy implements Hasher {
      digest = faker.random.uuid()
      plaintext: string
      async hash (plaintext: string): Promise<string> {
        this.plaintext = plaintext
        return this.digest
      }
    }
    const hasherSpy = new HasherSpy()
    const sut = new DbAddAccount(hasherSpy)
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(hasherSpy.plaintext).toBe(addAccountParams.password)
  })
})
