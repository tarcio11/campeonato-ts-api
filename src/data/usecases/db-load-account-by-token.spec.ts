import { DbLoadAccountByToken } from './db-load-account-by-token'
import { DecrypterSpy } from '../tests/mocks'

import faker from 'faker'

describe('DbLoadAccountByToken UseCase', () => {
  test('Should call Decrypter with correct ciphertext', async () => {
    const decrypterSpy = new DecrypterSpy()
    const sut = new DbLoadAccountByToken(decrypterSpy)
    const token = faker.random.uuid()
    const role = faker.random.word()
    await sut.load(token, role)
    expect(decrypterSpy.ciphertext).toBe(token)
  })
})
