import { Decrypter, Encrypter } from '../../data/protocols'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (plaintext: string): Promise<string> {
    const accessToken = await jwt.sign({ id: plaintext }, this.secret)
    return accessToken
  }

  async decrypt (ciphertext: string): Promise<string> {
    const value = jwt.verify(ciphertext, this.secret)
    return value as string
  }
}
