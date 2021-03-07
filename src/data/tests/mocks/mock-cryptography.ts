import { Decrypter, Encrypter, HashComparer, Hasher } from '../../protocols'

import faker from 'faker'

export class HasherSpy implements Hasher {
  digest = faker.random.uuid()
  plaintext: string

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.digest
  }
}

export class HashComparerSpy implements HashComparer {
  plaintext: string
  digest: string
  result = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return this.result
  }
}

export class EncrypterSpy implements Encrypter {
  plaintext: string
  ciphertext = faker.random.uuid()

  async encrypt (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.ciphertext
  }
}

export class DecrypterSpy implements Decrypter {
  ciphertext: string
  plaintext = faker.internet.password()

  async decrypt (ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext
    return this.plaintext
  }
}
